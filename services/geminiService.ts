import { GoogleGenAI } from "@google/genai";

// --- API Key Configuration ---
// It is strongly recommended to use an environment variable for your API key.
// This is more secure than hardcoding the key in your code.
// To deploy, set the API_KEY environment variable in your hosting provider's settings (e.g., AWS Amplify, Vercel).
//
// For local development, you can uncomment the line below and paste your key.
// IMPORTANT: Do NOT commit this change to a public repository.
const apiKey = process.env.API_KEY || "AIzaSyDvjScpub6HamERT6-paa7foB0lRunGSPI";

if (!apiKey) {
    throw new Error("API_KEY not found. Please set the environment variable or add it to services/geminiService.ts for local testing. See comments in the file for more details.");
}

const ai = new GoogleGenAI({ apiKey });


/**
 * Converts a File object to a GoogleGenerativeAI.Part object.
 * @param file The file to convert.
 * @returns A promise that resolves to the Part object.
 */
const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            // The result includes the data URL prefix, so we split it off.
            resolve(reader.result.split(',')[1]);
        } else {
            reject(new Error("Failed to read file as string"));
        }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

/**
 * Analyzes an image with a text prompt using the Gemini API.
 * @param prompt The text prompt for the analysis.
 * @param image The image file to analyze.
 * @returns A promise that resolves to the text response from the API.
 */
export const analyzeImageWithGemini = async (prompt: string, image: File): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(image);
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
};
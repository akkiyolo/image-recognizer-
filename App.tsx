
import React, { useState, useCallback } from 'react';
import { analyzeImageWithGemini } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import AnalysisControls from './components/AnalysisControls';
import ResponseDisplay from './components/ResponseDisplay';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('What do you see in this image?');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setAnalysis(null);
    setError(null);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeImageWithGemini(prompt, imageFile);
      setAnalysis(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Analysis failed: ${err.message}`);
      } else {
        setError('An unknown error occurred during analysis.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-wider text-cyan-400">
                Visual AI Analyzer
            </h1>
            <p className="text-sm text-gray-400">Powered by Gemini</p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="flex flex-col space-y-6">
            <ImageUploader 
                onImageUpload={handleImageUpload} 
                imagePreview={imagePreview}
            />
            <AnalysisControls
              prompt={prompt}
              setPrompt={setPrompt}
              onAnalyze={handleAnalyzeClick}
              isLoading={isLoading}
              isImageUploaded={!!imageFile}
            />
          </div>

          <div className="bg-gray-800/60 rounded-xl shadow-2xl p-6 h-full min-h-[400px] lg:min-h-0">
            <ResponseDisplay
              result={analysis}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

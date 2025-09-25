
import React from 'react';
import Loader from './Loader';

interface ResponseDisplayProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader />
        <p className="mt-4 text-lg text-gray-400">AI is analyzing the image...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-center">
        <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-400 font-semibold">Error</p>
            <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400 h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Analysis Result</h2>
        <p className="whitespace-pre-wrap text-gray-300">{result}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      <h3 className="text-xl font-semibold">Awaiting Analysis</h3>
      <p className="mt-2 max-w-xs">Upload an image and ask a question to see the AI's insights appear here.</p>
    </div>
  );
};

export default ResponseDisplay;

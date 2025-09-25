
import React from 'react';

interface AnalysisControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  isImageUploaded: boolean;
}

const AnalysisControls: React.FC<AnalysisControlsProps> = ({ prompt, setPrompt, onAnalyze, isLoading, isImageUploaded }) => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something about the image..."
        className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 h-28 resize-none"
        rows={3}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || !isImageUploaded}
        className="
          w-full px-6 py-3 text-lg font-semibold text-white bg-cyan-600 rounded-lg
          hover:bg-cyan-700 transition-all duration-300
          disabled:bg-gray-600 disabled:cursor-not-allowed
          focus:outline-none focus:ring-4 focus:ring-cyan-500/50
          shadow-lg hover:shadow-cyan-500/40 transform hover:-translate-y-0.5
        "
      >
        {isLoading ? 'Analyzing...' : 'Analyze Image'}
      </button>
    </div>
  );
};

export default AnalysisControls;

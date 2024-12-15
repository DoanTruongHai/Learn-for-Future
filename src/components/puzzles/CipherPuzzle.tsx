import React, { useState } from 'react';
import { Puzzle } from '../../types';

interface CipherPuzzleProps {
  puzzle: Puzzle;
  onSolve: () => void;
}

export const CipherPuzzle: React.FC<CipherPuzzleProps> = ({ puzzle, onSolve }) => {
  const [answers, setAnswers] = useState<string[]>(puzzle.data.problem.map(() => ''));
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (answers.join('') === puzzle.data.solution.join('')) {
      onSolve();
    } else {
      setError('Try again! Hint: Each letter is shifted by 3 positions in the alphabet.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">{puzzle.title}</h3>
      <p className="text-gray-600 mb-6">{puzzle.description}</p>
      
      <div className="space-y-4">
        {puzzle.data.problem.map((word, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="bg-gray-100 p-2 rounded font-mono">{word}</div>
            <span className="text-gray-400">→</span>
            <input
              type="text"
              value={answers[idx]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value.toUpperCase();
                setAnswers(newAnswers);
              }}
              className="border-2 border-gray-300 rounded p-2 font-mono uppercase"
              maxLength={word.length}
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Answer
      </button>
    </div>
  );
};
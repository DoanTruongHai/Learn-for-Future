import React, { useState } from 'react';
import { Puzzle } from '../../types';
import { Lightbulb } from 'lucide-react';

interface RiddlePuzzleProps {
    puzzle: Puzzle;
    onSolve: () => void;
}

export const RiddlePuzzle: React.FC<RiddlePuzzleProps> = ({ puzzle, onSolve }) => {
    const [answer, setAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (answer.toLowerCase() === puzzle.data.solution[0].toLowerCase()) {
            onSolve();
        } else {
            setError('That\'s not the answer. Think carefully about each clue!');
        }
    };

    const showNextHint = () => {
        if (currentHint < (puzzle.data.hints?.length || 0) - 1) {
            setCurrentHint(prev => prev + 1);
        }
        setShowHint(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">{puzzle.title}</h3>

                <div className="space-y-4 mb-8">
                    {puzzle.data.problem.map((line, idx) => (
                        <p key={idx} className="text-indigo-700 text-lg font-medium">{line}</p>
                    ))}
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter your answer"
                    />
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Submit
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                <div className="flex items-center gap-2">
                    <button
                        onClick={showNextHint}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                    >
                        <Lightbulb className="w-4 h-4" />
                        <span>Need a hint?</span>
                    </button>
                </div>

                {showHint && puzzle.data.hints && (
                    <div className="mt-4 p-4 bg-indigo-100 rounded-lg">
                        <p className="text-indigo-700">{puzzle.data.hints[currentHint]}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
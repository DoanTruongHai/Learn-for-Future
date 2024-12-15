import React, { useState } from 'react';
import { Puzzle } from '../../types';
import { Lightbulb } from 'lucide-react';

interface SequencePuzzleProps {
    puzzle: Puzzle;
    onSolve: () => void;
}

export const SequencePuzzle: React.FC<SequencePuzzleProps> = ({ puzzle, onSolve }) => {
    const [answer, setAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (answer === puzzle.data.solution[5]) {
            onSolve();
        } else {
            setError('That\'s not quite right. Try again!');
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
            <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-900 mb-4">{puzzle.title}</h3>
                <p className="text-purple-700 mb-6">{puzzle.description}</p>

                <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
                    {puzzle.data.problem.map((num, idx) => (
                        <div key={idx} className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-md text-xl font-bold text-purple-700">
                            {num}
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                        placeholder="Enter the missing number"
                    />
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                    >
                        <Lightbulb className="w-4 h-4" />
                        <span>Need a hint?</span>
                    </button>
                </div>

                {showHint && puzzle.data.hints && (
                    <div className="mt-4 p-4 bg-purple-100 rounded-lg">
                        <p className="text-purple-700">{puzzle.data.hints[currentHint]}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
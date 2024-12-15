import React, { useState, useEffect } from 'react';
import { Puzzle } from '../../types';
import { Timer } from 'lucide-react';

interface MemoryPuzzleProps {
    puzzle: Puzzle;
    onSolve: () => void;
}

export const MemoryPuzzle: React.FC<MemoryPuzzleProps> = ({ puzzle, onSolve }) => {
    const [showSymbols, setShowSymbols] = useState(true);
    const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(puzzle.data.timeLimit || 30);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameStarted, timeLeft]);

    const startGame = () => {
        setGameStarted(true);
        setTimeout(() => {
            setShowSymbols(false);
        }, 5000);
    };

    const handleSymbolClick = (symbol: string) => {
        if (!showSymbols && gameStarted) {
            const newSelected = [...selectedSymbols, symbol];
            setSelectedSymbols(newSelected);

            if (newSelected.length === puzzle.data.solution.length) {
                if (newSelected.every((s, i) => s === puzzle.data.solution[i])) {
                    onSolve();
                } else {
                    setSelectedSymbols([]);
                    setShowSymbols(true);
                    setTimeout(() => {
                        setShowSymbols(false);
                    }, 2000);
                }
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-blue-900">{puzzle.title}</h3>
                    <div className="flex items-center gap-2 text-blue-700">
                        <Timer className="w-5 h-5" />
                        <span className="font-mono">{timeLeft}s</span>
                    </div>
                </div>

                {!gameStarted ? (
                    <div className="text-center">
                        <p className="text-blue-700 mb-4">
                            Memorize the pattern of symbols. You'll have 5 seconds to study them.
                        </p>
                        <button
                            onClick={startGame}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Game
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {puzzle.data.problem.map((symbol, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSymbolClick(symbol)}
                                    className={`w-20 h-20 text-3xl flex items-center justify-center rounded-lg transition-all duration-300 ${showSymbols
                                            ? 'bg-white shadow-md'
                                            : 'bg-blue-100 hover:bg-blue-200 cursor-pointer'
                                        }`}
                                >
                                    {showSymbols ? symbol : '?'}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-center gap-2">
                            {selectedSymbols.map((symbol, idx) => (
                                <div
                                    key={idx}
                                    className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-md"
                                >
                                    {symbol}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
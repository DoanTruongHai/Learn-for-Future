import React from 'react';
import { Brain, Trophy } from 'lucide-react';
import { useLucid } from '../context/LucidProvider';

export const Header: React.FC = () => {
    const { address } = useLucid();

    return (
        <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="w-12 h-12 text-purple-600" />
                <h1 className="text-4xl font-bold text-gray-800">Puzzle Quest</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Challenge your mind with our collection of puzzles and earn unique NFT rewards for your achievements
            </p>
            {address && (
                <div className="mt-6 inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-700 font-medium">Connected and Ready to Play!</span>
                </div>
            )}
        </div>
    );
};
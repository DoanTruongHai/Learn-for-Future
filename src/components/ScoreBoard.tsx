import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';
import { GameState } from '../types';

interface ScoreBoardProps {
    gameState: GameState;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameState }) => {
    return (
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Score</h3>
                    <p className="text-2xl font-bold text-gray-900">{gameState.score}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Puzzles Completed</h3>
                    <p className="text-2xl font-bold text-gray-900">{gameState.unlockedNFTs.length}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">NFTs Earned</h3>
                    <p className="text-2xl font-bold text-gray-900">{gameState.unlockedNFTs.length}</p>
                </div>
            </div>
        </div>
    );
};
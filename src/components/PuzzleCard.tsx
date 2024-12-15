import React from 'react';
import { Trophy, Lock, ChevronRight } from 'lucide-react';
import { Puzzle } from '../types';

interface PuzzleCardProps {
  puzzle: Puzzle;
  onSelect: (id: number) => void;
}

export const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzle, onSelect }) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  }[puzzle.difficulty];

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onSelect(puzzle.id)}
    >
      <div className="relative">
        <img
          src={puzzle.imageUrl}
          alt={puzzle.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          {puzzle.completed ? (
            <div className="bg-green-500 p-2 rounded-full">
              <Trophy className="h-5 w-5 text-white" />
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-full">
              <Lock className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{puzzle.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor}`}>
            {puzzle.difficulty}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{puzzle.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">NFT Reward</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
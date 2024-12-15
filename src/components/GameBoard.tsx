import React, { useState } from 'react';
import { PuzzleCard } from './PuzzleCard';
import { NFTReward } from './NFTReward';
import { CipherPuzzle } from './puzzles/CipherPuzzle';
import { SlidingPuzzle } from './puzzles/SlidingPuzzle';

import { MemoryPuzzle } from './puzzles/MemoryPuzzle';
import { RiddlePuzzle } from './puzzles/RiddlePuzzle';
import { puzzles } from '../data/puzzles';
import { GameState, Puzzle } from '../types';
import { useLucid } from '../context/LucidProvider';
import { ScoreBoard } from './ScoreBoard';
import { SequencePuzzle } from './SequencePuzzle';

export const GameBoard: React.FC = () => {
  const { address } = useLucid();
  const [gameState, setGameState] = useState<GameState>({
    currentPuzzle: 0,
    score: 0,
    unlockedNFTs: [],
    puzzleState: {},
    hintsUsed: 0,
    timeSpent: 0
  });

  const [showReward, setShowReward] = useState(false);
  const [completedPuzzle, setCompletedPuzzle] = useState<Puzzle | null>(null);
  const [activePuzzle, setActivePuzzle] = useState<Puzzle | null>(null);

  const handlePuzzleSelect = (puzzle: Puzzle) => {
    if (!address) {
      alert('Please connect your wallet first to play puzzles!');
      return;
    }
    setActivePuzzle(puzzle);
  };

  const handlePuzzleComplete = (puzzle: Puzzle) => {
    if (!puzzle.completed) {
      setCompletedPuzzle(puzzle);
      setShowReward(true);
      setGameState(prev => ({
        ...prev,
        score: prev.score + calculateScore(puzzle.difficulty),
        unlockedNFTs: [...prev.unlockedNFTs, puzzle.nftReward.name]
      }));
      setActivePuzzle(null);
    }
  };

  const calculateScore = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 100;
      case 'Medium':
        return 250;
      case 'Hard':
        return 500;
      default:
        return 100;
    }
  };

  const renderPuzzle = (puzzle: Puzzle) => {
    switch (puzzle.type) {
      case 'cipher':
        return <CipherPuzzle puzzle={puzzle} onSolve={() => handlePuzzleComplete(puzzle)} />;
      case 'sliding':
        return <SlidingPuzzle puzzle={puzzle} onSolve={() => handlePuzzleComplete(puzzle)} />;
      case 'sequence':
        return <SequencePuzzle puzzle={puzzle} onSolve={() => handlePuzzleComplete(puzzle)} />;
      case 'memory':
        return <MemoryPuzzle puzzle={puzzle} onSolve={() => handlePuzzleComplete(puzzle)} />;
      case 'riddle':
        return <RiddlePuzzle puzzle={puzzle} onSolve={() => handlePuzzleComplete(puzzle)} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <ScoreBoard gameState={gameState} />

      {showReward && completedPuzzle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full">
            <NFTReward
              puzzle={completedPuzzle}
              onClose={() => {
                setShowReward(false);
                setCompletedPuzzle(null);
              }}
            />
          </div>
        </div>
      )}

      {activePuzzle ? (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => setActivePuzzle(null)}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
          >
            ← Back to Puzzles
          </button>
          {renderPuzzle(activePuzzle)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {puzzles.map(puzzle => (
            <PuzzleCard
              key={puzzle.id}
              puzzle={puzzle}
              onSelect={() => handlePuzzleSelect(puzzle)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { Puzzle } from '../../types';

interface SlidingPuzzleProps {
  puzzle: Puzzle;
  onSolve: () => void;
}

export const SlidingPuzzle: React.FC<SlidingPuzzleProps> = ({ puzzle, onSolve }) => {
  const [grid, setGrid] = useState(puzzle.data.currentState || puzzle.data.problem);
  
  const canMove = (index: number) => {
    const emptyIndex = grid.indexOf('');
    const gridSize = 3; // 3x3 grid
    const row = Math.floor(index / gridSize);
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const col = index % gridSize;
    const emptyCol = emptyIndex % gridSize;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const handleMove = (index: number) => {
    if (!canMove(index)) return;

    const newGrid = [...grid];
    const emptyIndex = grid.indexOf('');
    [newGrid[index], newGrid[emptyIndex]] = [newGrid[emptyIndex], newGrid[index]];
    setGrid(newGrid);

    if (newGrid.join('') === puzzle.data.solution.join('')) {
      onSolve();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">{puzzle.title}</h3>
      <p className="text-gray-600 mb-6">{puzzle.description}</p>

      <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto">
        {grid.map((number, index) => (
          <button
            key={index}
            onClick={() => handleMove(index)}
            className={`h-20 text-2xl font-bold rounded-lg transition
              ${number ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100'}
              ${canMove(index) ? 'cursor-pointer' : 'cursor-not-allowed'}
            `}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
export interface Puzzle {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  imageUrl: string;
  type: "pattern" | "sliding" | "cipher" | "memory" | "sequence" | "riddle";
  data: {
    problem: string[];
    solution: string[];
    currentState?: string[];
    hints?: string[];
    timeLimit?: number;
  };
  nftReward: {
    name: string;
    description: string;
    imageUrl: string;
  };
}

export interface GameState {
  currentPuzzle: number;
  score: number;
  unlockedNFTs: string[];
  puzzleState: Record<number, string[]>;
  hintsUsed: number;
  timeSpent: number;
}

import { Puzzle } from "../types";

export const puzzles: Puzzle[] = [
  {
    id: 1,
    title: "Ancient Cipher Mystery",
    description:
      "Decode the ancient scrolls using a special cipher where each letter holds a secret meaning.",
    difficulty: "Medium",
    completed: false,
    type: "cipher",
    imageUrl:
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&w=800&q=80",
    data: {
      problem: ["KHOOR", "ZRUOG", "SXCCOH"],
      solution: ["HELLO", "WORLD", "PUZZLE"],
      hints: [
        "Each letter is shifted by 3 positions in the alphabet",
        "K → H (shift back 3 letters)",
        "Think of Julius Caesar's secret messages",
      ],
    },
    nftReward: {
      name: "CryptoMaster#1",
      description: "A testament to your mastery of ancient ciphers and codes",
      imageUrl: "ipfs://QmcbZnkTWktxxQ3FignBoWCqcChPP9PK1DkyZbny3u6rjM",
    },
  },
  {
    id: 2,
    title: "Mystic Sequence",
    description:
      "Uncover the pattern in this mystical sequence of symbols and numbers.",
    difficulty: "Hard",
    completed: false,
    type: "sequence",
    imageUrl:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    data: {
      problem: ["2", "3", "5", "7", "11", "?", "17"],
      solution: ["2", "3", "5", "7", "11", "13", "17"],
      hints: [
        "These numbers share a special property",
        "Each number can only be divided by 1 and itself",
        "Think about prime numbers",
      ],
    },
    nftReward: {
      name: "SequenceMaster#1",
      description: "Awarded for mastering the art of mathematical sequences",
      imageUrl: "ipfs://QmcbZnkTWktxxQ3FignBoWCqcChPP9PK1DkyZbny3u6rjM",
    },
  },
  {
    id: 3,
    title: "Memory Matrix",
    description:
      "Remember and recreate the pattern of symbols in this challenging memory test.",
    difficulty: "Medium",
    completed: false,
    type: "memory",
    imageUrl:
      "https://images.unsplash.com/photo-1505356822725-08ad25f3ffe4?auto=format&fit=crop&w=800&q=80",
    data: {
      problem: ["🌟", "🌙", "☀️", "⭐", "🌎", "💫", "🌍", "🌏", "✨"],
      solution: ["🌟", "🌙", "☀️", "⭐", "🌎", "💫", "🌍", "🌏", "✨"],
      timeLimit: 30,
    },
    nftReward: {
      name: "MemoryKeeper#1",
      description:
        "For those with extraordinary memory and pattern recognition skills",
      imageUrl: "ipfs://QmcbZnkTWktxxQ3FignBoWCqcChPP9PK1DkyZbny3u6rjM",
    },
  },
  {
    id: 4,
    title: "Cosmic Riddle",
    description:
      "Solve this cosmic riddle that challenges both logic and creativity.",
    difficulty: "Hard",
    completed: false,
    type: "riddle",
    imageUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
    data: {
      problem: [
        "I have cities, but no houses.",
        "I have mountains, but no trees.",
        "I have water, but no fish.",
        "I have roads, but no cars.",
        "What am I?",
      ],
      solution: ["MAP"],
      hints: [
        "I am flat but show depth",
        "I guide travelers on their journey",
        "I represent the world in miniature",
      ],
    },
    nftReward: {
      name: "RiddleMaster#1",
      description: "For those who can unravel the mysteries of the cosmos",
      imageUrl: "ipfs://QmcbZnkTWktxxQ3FignBoWCqcChPP9PK1DkyZbny3u6rjM",
    },
  },
];

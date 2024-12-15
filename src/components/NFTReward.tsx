import React from 'react';
import { Award } from 'lucide-react';
import { NFTMinter } from './NFTMinter';
import { Puzzle } from '../types';
import { ipfsToHttp } from '../utils/ipfs';

interface NFTRewardProps {
  puzzle: Puzzle;
  onClose: () => void;
}

export const NFTReward: React.FC<NFTRewardProps> = ({ puzzle, onClose }) => {
  const { nftReward } = puzzle;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-lg">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Award className="text-purple-500 h-6 w-6" />
          <h3 className="text-xl font-bold text-gray-800">{nftReward.name}</h3>
        </div>
        <img
          src={ipfsToHttp(nftReward.imageUrl)}
          alt={nftReward.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <p className="text-gray-600 mb-4">{nftReward.description}</p>
        <NFTMinter puzzle={puzzle} onMintComplete={onClose} />
      </div>
    </div>
  );
};
import React from 'react';
import { Wallet } from 'lucide-react';
import { useLucid } from '../context/LucidProvider';

export const WalletConnect: React.FC = () => {
    const { address, connectWallet } = useLucid();

    return (
        <div className="flex items-center gap-2">
            {address ? (
                <div className="flex items-center gap-2 bg-white border border-purple-200 shadow-sm px-4 py-2 rounded-lg">
                    <Wallet className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">
                        {`${address.slice(0, 6)}...${address.slice(-4)}`}
                    </span>
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    <Wallet className="h-5 w-5" />
                    <span className="font-medium">Connect Wallet</span>
                </button>
            )}
        </div>
    );
};
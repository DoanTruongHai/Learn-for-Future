import { fromText } from 'lucid-cardano';
import React, { useState } from 'react';
import { useLucid } from '../context/LucidProvider';
import { Puzzle } from '../types';
import { Wallet } from 'lucide-react';
import { createNFTMetadata } from '../utils/metadata';


interface NFTMinterProps {
    puzzle: Puzzle;
    onMintComplete: () => void;
}

export const NFTMinter: React.FC<NFTMinterProps> = ({ puzzle, onMintComplete }) => {
    const { lucid, address, connectWallet } = useLucid();
    const [txHash, setTxHash] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const getMintingPolicy = async () => {
        if (!lucid || !address) {
            throw new Error("Wallet not connected");
        }

        const { paymentCredential } = lucid.utils.getAddressDetails(address);

        if (!paymentCredential) {
            throw new Error("Payment credential not found");
        }

        const mintingPolicy = lucid.utils.nativeScriptFromJson({
            type: "all",
            scripts: [
                { type: "sig", keyHash: paymentCredential.hash },
                {
                    type: "before",
                    slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
                },
            ],
        });

        const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
        return { policyId, mintingPolicy };
    };

    const mintNFT = async () => {
        setError("");
        setIsLoading(true);

        try {
            if (!lucid || !address) {
                throw new Error("Please connect your wallet first");
            }

            const { mintingPolicy, policyId } = await getMintingPolicy();
            const assetName = fromText(puzzle.nftReward.name);

            const metadata = createNFTMetadata(
                policyId,
                puzzle.nftReward.name,
                puzzle.nftReward.description,
                puzzle.nftReward.imageUrl
            );

            const tx = await lucid.newTx()
                .mintAssets({ [policyId + assetName]: 1n })
                .attachMetadata(721, metadata["721"])
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();

            const signedTx = await tx.sign().complete();
            const txHashResult = await signedTx.submit();
            setTxHash(txHashResult);
            onMintComplete();
        } catch (error) {
            console.error("Error minting NFT:", error);
            setError(error instanceof Error ? error.message : "Failed to mint NFT");
        } finally {
            setIsLoading(false);
        }
    };

    if (!address) {
        return (
            <button
                onClick={connectWallet}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
            >
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet to Mint NFT</span>
            </button>
        );
    }

    return (
        <div className="mt-4">
            <button
                onClick={mintNFT}
                disabled={isLoading}
                className={`w-full bg-purple-600 text-white py-3 px-6 rounded-lg transition
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
            >
                {isLoading ? 'Minting...' : 'Mint NFT Achievement'}
            </button>
            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            {txHash && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Transaction Hash:</p>
                    <p className="font-mono text-gray-800 break-all">{txHash}</p>
                </div>
            )}
        </div>
    );
};
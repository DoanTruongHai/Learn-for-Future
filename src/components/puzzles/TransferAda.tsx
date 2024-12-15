import React, { useState } from "react";
import { useLucid } from "../context/LucidProvider";

export const TransferAda: React.FC = () => {
    const { lucid } = useLucid();
    const [ada, setAda] = useState<number>(0);
    const [receiverAddress, setReceiverAddress] = useState<string>("");
    const [txHash, setTxHash] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const transferAda = async () => {
        if (!lucid) {
            setError("Lucid is not initialized");
            return;
        }

        if (!receiverAddress || ada <= 0) {
            setError("Invalid receiver address or ADA amount");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const tx = await lucid
                .newTx()
                .payToAddress(receiverAddress, { lovelace: BigInt(ada) * 1_000_000n })
                .complete();

            const signedTx = await tx.sign().complete();
            const txHashResult = await signedTx.submit();

            setTxHash(txHashResult);
        } catch (err) {
            setError("Transaction failed. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="transfer-ada">
            <h1 className="text-xl font-bold mb-4">Transfer ADA</h1>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Receiver Address</label>
                <input
                    type="text"
                    className="border rounded w-full p-2"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    placeholder="Enter receiver address"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Amount (ADA)</label>
                <input
                    type="number"
                    className="border rounded w-full p-2"
                    value={ada}
                    onChange={(e) => setAda(Number(e.target.value))}
                    placeholder="Enter ADA amount"
                />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
                onClick={transferAda}
                disabled={isLoading}
                className={`w-full p-2 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                    }`}
            >
                {isLoading ? "Processing..." : "Send ADA"}
            </button>

            {txHash && (
                <p className="text-green-500 text-sm mt-4">
                    Transaction Successful! Hash: <strong>{txHash}</strong>
                </p>
            )}
        </div>
    );
};

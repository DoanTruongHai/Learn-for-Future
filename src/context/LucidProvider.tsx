import { Blockfrost, Lucid } from "lucid-cardano";
import React, { createContext, useContext, useEffect } from "react";

interface LucidContextType {
    lucid: Lucid | null;
    setLucid: (lucid: Lucid) => void;
    address: string | null;
    connectWallet: () => Promise<void>;
    getUTxOs: () => Promise<any>;
}

const LucidContext = createContext<LucidContextType | undefined>(undefined);

export const LucidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lucid, setLucid] = React.useState<Lucid | null>(null);
    const [address, setAddress] = React.useState<string | null>(null);

    useEffect(() => {
        async function initLucid() {
            const lucidInstance = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preview.blockfrost.io/api/v0",
                    "previewsm1Qs1fNN7QrztAZhZZjOJSqFnsEq0jO"
                ),
                "Preview",
            );
            setLucid(lucidInstance);
        }
        initLucid();
    }, []);

    const connectWallet = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }
        const api = await window.cardano.nami.enable();
        lucid.selectWallet(api);
        const addressResponse = await lucid.wallet.address();
        setAddress(addressResponse);
    };

    const getUTxOs = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }
        return await lucid.wallet.getUtxos();
    };

    return (
        <LucidContext.Provider value={{ lucid, setLucid, address, connectWallet, getUTxOs }}>
            {children}
        </LucidContext.Provider>
    );
};

export const useLucid = () => {
    const context = useContext(LucidContext);
    if (!context) {
        throw new Error("useLucid must be used within a LucidProvider");
    }
    return context;
};
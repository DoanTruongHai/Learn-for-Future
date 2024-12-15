import React from 'react';
import { GameBoard } from './components/GameBoard';
import { LucidProvider } from './context/LucidProvider';
import { WalletConnect } from './components/WalletConnect';
import { Header } from './components/Header';

function App() {
  return (
    <LucidProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <div className="flex justify-end mb-6">
            <WalletConnect />
          </div>
          <GameBoard />
        </div>
      </div>
    </LucidProvider>
  );
}

export default App;
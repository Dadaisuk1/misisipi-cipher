import React, { useState } from "react";
import { CipherMenu } from "./components/CipherMenu";
import { EncryptionPanel } from "./components/EncryptionPanel";
import { ChatHistory } from "./components/ChatHistory";
import type { CipherType } from "./services/ciphers";

export interface HistoryEntry {
  id: string;
  cipher: CipherType;
  original: string;
  encrypted: string;
  decrypted: string;
  key: string;
  timestamp: number;
}

export const App: React.FC = () => {
  const [selectedCipher, setSelectedCipher] = useState<CipherType | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleCipherSelect = (cipher: CipherType | null) => {
    setSelectedCipher(cipher);
  };

  const handleAddHistory = (entry: HistoryEntry) => {
    setHistory([entry, ...history]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-spotify-black text-text-base">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-spotify-green mb-2">
            Misisipi Cipher
          </h1>
          <p className="text-text-secondary">
            Classical cipher encryption and decryption tool
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar: Cipher Menu */}
          <aside className="lg:col-span-1">
            <CipherMenu
              selectedCipher={selectedCipher}
              onSelectCipher={handleCipherSelect}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedCipher ? (
              <>
                <EncryptionPanel
                  cipher={selectedCipher}
                  onAddHistory={handleAddHistory}
                />

                {history.length > 0 && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">Chat History</h2>
                      <button
                        onClick={handleClearHistory}
                        className="px-4 py-2 bg-text-negative text-spotify-black rounded hover:opacity-80 transition"
                      >
                        Clear
                      </button>
                    </div>
                    <ChatHistory history={history} />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-spotify-dark rounded p-8 text-center">
                <p className="text-text-secondary text-lg">
                  Select a cipher to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

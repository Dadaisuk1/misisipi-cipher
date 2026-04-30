import React from "react";
import type { CipherType } from "../services/ciphers";

interface CipherMenuProps {
  selectedCipher: CipherType | null;
  onSelectCipher: (cipher: CipherType | null) => void;
}

const CIPHERS: Array<{ id: CipherType; name: string; description: string }> = [
  {
    id: "caesar",
    name: "Caesar",
    description: "Shift cipher by fixed number",
  },
  {
    id: "vigenere",
    name: "Vigenere",
    description: "Polyalphabetic substitution",
  },
  {
    id: "railfence",
    name: "Rail Fence",
    description: "Zigzag transposition cipher",
  },
  {
    id: "playfair",
    name: "Playfair",
    description: "Digraph substitution cipher",
  },
];

export const CipherMenu: React.FC<CipherMenuProps> = ({
  selectedCipher,
  onSelectCipher,
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-spotify-green mb-4">Ciphers</h2>
      {CIPHERS.map((cipher) => (
        <button
          key={cipher.id}
          onClick={() => onSelectCipher(cipher.id)}
          className={`w-full text-left p-4 rounded transition ${
            selectedCipher === cipher.id
              ? "bg-spotify-green text-spotify-black"
              : "bg-spotify-dark text-text-base hover:bg-spotify-surface"
          }`}
        >
          <div className="font-bold">{cipher.name}</div>
          <div
            className={`text-sm ${
              selectedCipher === cipher.id
                ? "text-spotify-black"
                : "text-text-secondary"
            }`}
          >
            {cipher.description}
          </div>
        </button>
      ))}
    </div>
  );
};

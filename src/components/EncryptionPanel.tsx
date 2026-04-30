import React, { useState } from "react";
import type { CipherType } from "../services/ciphers";
import type { HistoryEntry } from "../App";
import { getCipher } from "../services/ciphers";

interface EncryptionPanelProps {
  cipher: CipherType;
  onAddHistory: (entry: HistoryEntry) => void;
}

const getKeyLabel = (cipher: CipherType): string => {
  switch (cipher) {
    case "caesar":
      return "Shift (1-25)";
    case "vigenere":
      return "Keyword";
    case "railfence":
      return "Number of Rails (2-5)";
    case "playfair":
      return "Keyword";
    default:
      return "Key";
  }
};

export const EncryptionPanel: React.FC<EncryptionPanelProps> = ({
  cipher,
  onAddHistory,
}) => {
  const [key, setKey] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [error, setError] = useState("");

  const handleEncrypt = () => {
    try {
      setError("");
      if (!key) throw new Error("Key is required");
      if (!plaintext) throw new Error("Text is required");

      const cipherOps = getCipher(cipher);
      const encrypted = cipherOps.encrypt(plaintext, key);
      setCiphertext(encrypted);

      onAddHistory({
        id: `${Date.now()}`,
        cipher,
        original: plaintext,
        encrypted,
        decrypted: "",
        key,
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encryption failed");
      setCiphertext("");
    }
  };

  const handleDecrypt = () => {
    try {
      setError("");
      if (!key) throw new Error("Key is required");
      if (!ciphertext) throw new Error("Ciphertext is required");

      const cipherOps = getCipher(cipher);
      const decryptedText = cipherOps.decrypt(ciphertext, key);
      setDecrypted(decryptedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decryption failed");
      setDecrypted("");
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-text-negative text-spotify-black p-4 rounded">
          {error}
        </div>
      )}

      {/* Key Input */}
      <div>
        <label className="block text-text-secondary mb-2 font-semibold">
          {getKeyLabel(cipher)}
        </label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={cipher === "caesar" ? "e.g., 3" : "e.g., password"}
          className="w-full px-4 py-2 bg-spotify-surface text-text-base rounded border border-border-gray focus:border-spotify-green focus:outline-none"
        />
      </div>

      {/* Encryption Section */}
      <div className="border-t border-border-gray pt-6">
        <h3 className="text-lg font-bold mb-4">Encrypt</h3>
        <div>
          <label className="block text-text-secondary mb-2">Plaintext</label>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            placeholder="Enter text to encrypt..."
            rows={4}
            className="w-full px-4 py-2 bg-spotify-surface text-text-base rounded border border-border-gray focus:border-spotify-green focus:outline-none resize-none"
          />
        </div>
        <button
          onClick={handleEncrypt}
          className="mt-4 px-6 py-2 bg-spotify-green text-spotify-black font-bold rounded hover:bg-spotify-green-alt transition"
        >
          Encrypt
        </button>
        {ciphertext && (
          <div className="mt-4 p-4 bg-spotify-surface rounded">
            <label className="block text-text-secondary mb-2 font-semibold">
              Ciphertext
            </label>
            <p className="text-text-base font-mono break-words">{ciphertext}</p>
          </div>
        )}
      </div>

      {/* Decryption Section */}
      <div className="border-t border-border-gray pt-6">
        <h3 className="text-lg font-bold mb-4">Decrypt</h3>
        <div>
          <label className="block text-text-secondary mb-2">Ciphertext</label>
          <textarea
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            placeholder="Enter ciphertext to decrypt..."
            rows={4}
            className="w-full px-4 py-2 bg-spotify-surface text-text-base rounded border border-border-gray focus:border-spotify-green focus:outline-none resize-none"
          />
        </div>
        <button
          onClick={handleDecrypt}
          className="mt-4 px-6 py-2 bg-spotify-green text-spotify-black font-bold rounded hover:bg-spotify-green-alt transition"
        >
          Decrypt
        </button>
        {decrypted && (
          <div className="mt-4 p-4 bg-spotify-surface rounded">
            <label className="block text-text-secondary mb-2 font-semibold">
              Decrypted Text
            </label>
            <p className="text-text-base font-mono break-words">{decrypted}</p>
          </div>
        )}
      </div>
    </div>
  );
};

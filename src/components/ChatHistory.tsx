import React from "react";
import type { HistoryEntry } from "../App";

interface ChatHistoryProps {
  history: HistoryEntry[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div
          key={entry.id}
          className="bg-spotify-dark p-4 rounded border border-border-gray"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-spotify-green capitalize">
                {entry.cipher} Cipher
              </h4>
              <p className="text-sm text-text-secondary">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <span className="text-xs bg-spotify-surface text-text-secondary px-2 py-1 rounded">
              Key: {entry.key}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <label className="text-text-secondary">Original:</label>
              <p className="text-text-base font-mono break-words">
                {entry.original}
              </p>
            </div>

            <div>
              <label className="text-text-secondary">Encrypted:</label>
              <p className="text-text-base font-mono break-words">
                {entry.encrypted}
              </p>
            </div>

            {entry.decrypted && (
              <div>
                <label className="text-text-secondary">Decrypted:</label>
                <p className="text-text-base font-mono break-words">
                  {entry.decrypted}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

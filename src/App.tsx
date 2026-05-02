import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { caesar, vigenere, railFence, playfair } from "./services/ciphers";

interface Message {
  id: string;
  type: "plaintext" | "encrypted" | "decrypted";
  content: string;
  cipherType: string;
  key: string;
  timestamp: number;
  status: "success" | "error";
  errorMessage?: string;
}

type CipherType = "caesar" | "vigenere" | "railfence" | "playfair";

const CIPHER_HINTS: Record<CipherType, string> = {
  caesar: "Numeric key (1-25)",
  vigenere: "Text key (any length)",
  railfence: "Number of rails (2-5)",
  playfair: "Text key (5-8 chars, no J)",
};

const App: React.FC = () => {
  const [selectedCipher, setSelectedCipher] = useState<CipherType>("caesar");
  const [key, setKey] = useState("3");
  const [message, setMessage] = useState("HELLO WORLD");
  const [messages, setMessages] = useState<Message[]>([]);
  const [simulatedUserB, setSimulatedUserB] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cipherChatHistory");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cipherChatHistory", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const encryptMessage = (
    text: string,
    cipherType: CipherType,
    encKey: string,
  ) => {
    try {
      let encrypted: string;
      let validatedKey: string;

      switch (cipherType) {
        case "caesar": {
          const keyNum = parseInt(encKey);
          if (isNaN(keyNum) || keyNum < 1 || keyNum > 25) {
            throw new Error("Key must be a number between 1 and 25");
          }
          validatedKey = encKey;
          encrypted = caesar.encrypt(text, keyNum);
          break;
        }
        case "vigenere": {
          if (!encKey || encKey.trim().length === 0) {
            throw new Error("Key cannot be empty");
          }
          validatedKey = encKey.toUpperCase();
          encrypted = vigenere.encrypt(text, validatedKey);
          break;
        }
        case "railfence": {
          const keyNum = parseInt(encKey);
          if (isNaN(keyNum) || keyNum < 2 || keyNum > 5) {
            throw new Error("Number of rails must be between 2 and 5");
          }
          validatedKey = encKey;
          encrypted = railFence.encrypt(text, keyNum);
          break;
        }
        case "playfair": {
          if (!encKey || encKey.trim().length === 0) {
            throw new Error("Key cannot be empty");
          }
          validatedKey = encKey.toUpperCase();
          encrypted = playfair.encrypt(text, validatedKey);
          break;
        }
        default:
          throw new Error("Unknown cipher type");
      }

      return { encrypted, validatedKey, error: null };
    } catch (error) {
      return {
        encrypted: "",
        validatedKey: "",
        error: error instanceof Error ? error.message : "Encryption failed",
      };
    }
  };

  const decryptMessage = (
    text: string,
    cipherType: CipherType,
    encKey: string,
  ) => {
    try {
      let decrypted: string;

      switch (cipherType) {
        case "caesar": {
          const keyNum = parseInt(encKey);
          decrypted = caesar.decrypt(text, keyNum);
          break;
        }
        case "vigenere": {
          decrypted = vigenere.decrypt(text, encKey);
          break;
        }
        case "railfence": {
          const keyNum = parseInt(encKey);
          decrypted = railFence.decrypt(text, keyNum);
          break;
        }
        case "playfair": {
          decrypted = playfair.decrypt(text, encKey);
          break;
        }
        default:
          throw new Error("Unknown cipher type");
      }

      return { decrypted, error: null };
    } catch (error) {
      return {
        decrypted: "",
        error: error instanceof Error ? error.message : "Decryption failed",
      };
    }
  };

  const handleEncrypt = () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    if (!key.trim()) {
      alert("Please enter a key");
      return;
    }

    const id = Date.now().toString();
    const processedMessage = message.toUpperCase();

    // User A - Plaintext
    const plaintextMsg: Message = {
      id: `${id}-plaintext`,
      type: "plaintext",
      content: processedMessage,
      cipherType: selectedCipher,
      key: key,
      timestamp: Date.now(),
      status: "success",
    };

    // Encrypt
    const {
      encrypted,
      validatedKey,
      error: encryptError,
    } = encryptMessage(processedMessage, selectedCipher, key);

    if (encryptError) {
      const errorMsg: Message = {
        id: `${id}-error`,
        type: "encrypted",
        content: "",
        cipherType: selectedCipher,
        key: key,
        timestamp: Date.now(),
        status: "error",
        errorMessage: encryptError,
      };
      setMessages((prev) => [...prev, plaintextMsg, errorMsg]);
      return;
    }

    // System - Encrypted
    const encryptedMsg: Message = {
      id: `${id}-encrypted`,
      type: "encrypted",
      content: encrypted,
      cipherType: selectedCipher,
      key: validatedKey,
      timestamp: Date.now(),
      status: "success",
    };

    let newMessages = [plaintextMsg, encryptedMsg];

    // User B - Decrypted (if enabled)
    if (simulatedUserB) {
      const { decrypted, error: decryptError } = decryptMessage(
        encrypted,
        selectedCipher,
        validatedKey,
      );

      const decryptedMsg: Message = {
        id: `${id}-decrypted`,
        type: "decrypted",
        content: decryptError ? "" : decrypted,
        cipherType: selectedCipher,
        key: validatedKey,
        timestamp: Date.now(),
        status: decryptError ? "error" : "success",
        errorMessage: decryptError || undefined,
      };

      newMessages.push(decryptedMsg);
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setMessage("");
  };

  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all messages? This cannot be undone.",
      )
    ) {
      setMessages([]);
      localStorage.removeItem("cipherChatHistory");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEncrypt();
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="nav-section logo-section">
          <img
            src="/cypher_logo.svg"
            alt="CIPHER Logo"
            className="logo-image"
          />
          <div className="logo">CIPHER</div>
        </nav>

        <nav className="nav-section">
          <div className="nav-label">Navigation</div>
          <div className="nav-item active">Home</div>
          <div className="nav-item">Encryption</div>
          <div className="nav-item">Decryption</div>
          <div className="nav-item">History</div>
        </nav>

        <nav className="nav-section">
          <div className="nav-label">Tools</div>
          <div className="nav-item">Key Generator</div>
          <div className="nav-item">Algorithm Ref</div>
        </nav>

        <nav className="nav-section">
          <div className="nav-label">Features</div>
          <label className="nav-item toggle">
            <input
              type="checkbox"
              checked={simulatedUserB}
              onChange={(e) => setSimulatedUserB(e.target.checked)}
            />
            <span>Simulate User B</span>
          </label>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="header-title">Cipher Chat</h1>
          <p className="header-subtitle">
            Classical encryption messaging • Learn cryptography interactively
          </p>
        </header>

        {/* Control Panel */}
        <section className="control-panel">
          <div className="control-section">
            <label className="control-label">
              Cipher Algorithm
              <span className="hint-badge">SELECT ONE</span>
            </label>
            <div className="cipher-grid">
              {(
                ["caesar", "vigenere", "railfence", "playfair"] as CipherType[]
              ).map((cipher) => (
                <button
                  key={cipher}
                  className={`cipher-btn ${selectedCipher === cipher ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCipher(cipher);
                    setKey("");
                  }}
                >
                  {cipher === "caesar"
                    ? "Caesar"
                    : cipher === "vigenere"
                      ? "Vigenere"
                      : cipher === "railfence"
                        ? "Rail Fence"
                        : "Playfair"}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section">
            <div className="input-wrapper">
              <label className="input-label">Encryption Key</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter key..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="key-hint">{CIPHER_HINTS[selectedCipher]}</div>
            </div>

            <div className="input-wrapper">
              <label className="input-label">Message to Encrypt</label>
              <textarea
                className="input-field textarea"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
              />
            </div>
          </div>
        </section>

        {/* Chat Area */}
        <section className="chat-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💬</div>
              <p className="empty-state-text">No messages yet</p>
              <p className="empty-state-subtext">
                Select a cipher, enter a key, type a message, and click "Encrypt
                & send" to begin.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-block ${msg.type} ${msg.status}`}
              >
                <div className="message-label">
                  <span className={`status-dot ${msg.status}`}></span>
                  {msg.type === "plaintext" && "User A • Plaintext"}
                  {msg.type === "encrypted" && (
                    <>
                      <span className="cipher-badge">
                        {msg.cipherType.toUpperCase()}
                      </span>
                      Encrypted (Key: {msg.key})
                    </>
                  )}
                  {msg.type === "decrypted" &&
                    "User B • Decrypted & Verified ✓"}
                </div>
                {msg.status === "error" ? (
                  <div className="message-error">⚠ {msg.errorMessage}</div>
                ) : (
                  <div className="message-content">{msg.content}</div>
                )}
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </section>

        {/* Action Bar */}
        <footer className="action-bar">
          <button
            className="action-btn secondary"
            onClick={handleClearHistory}
            disabled={messages.length === 0}
          >
            Clear History
          </button>
          <button className="action-btn primary" onClick={handleEncrypt}>
            Encrypt & Send ↗
          </button>
        </footer>
      </main>
    </div>
  );
};

export default App;

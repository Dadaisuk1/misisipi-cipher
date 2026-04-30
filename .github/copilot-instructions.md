# Copilot Instructions for Misisipi Cipher

## Project Overview

**misisipi-cipher** is a React 19 + TypeScript + Vite application that implements classical cipher encryption/decryption with a menu-driven interface. The app supports four cipher algorithms (Caesar, Vigenere, Rail Fence, Playfair) with full encryption/decryption capabilities and message history tracking. It uses the Spotify color theme for styling (dark background, green accents).

## Architecture

### High-Level Structure

```
src/
├── App.tsx                    # Main app state (selectedCipher, history)
├── components/
│   ├── CipherMenu.tsx         # Cipher selection sidebar
│   ├── EncryptionPanel.tsx    # Encryption/decryption UI
│   └── ChatHistory.tsx        # Message history display
├── services/
│   └── ciphers/
│       ├── caesar.ts          # Caesar shift cipher
│       ├── vigenere.ts        # Vigenere polyalphabetic cipher
│       ├── railfence.ts       # Rail Fence transposition
│       ├── playfair.ts        # Playfair digraph cipher
│       └── index.ts           # Cipher interface + factory
└── index.css                  # Spotify theme colors (reused from Tailwind)
```

### Data Flow

1. **App.tsx** manages two pieces of state:
   - `selectedCipher`: Current cipher type (Caesar/Vigenere/RailFence/Playfair or null)
   - `history`: Array of HistoryEntry objects (encryption/decryption records)

2. **CipherMenu** component:
   - Lists all 4 ciphers with descriptions
   - Fires `onSelectCipher(cipherType)` → updates App state

3. **EncryptionPanel** component:
   - Displays based on selected cipher
   - Key input (dynamic label per cipher: "Shift" for Caesar, "Keyword" for Vigenere, etc.)
   - Plaintext input → Encrypt button → Shows ciphertext
   - Ciphertext input → Decrypt button → Shows decrypted output
   - Errors displayed at top (red bg)

4. **ChatHistory** component:
   - Displays all past encryption/decryption operations
   - Shows: cipher type, original text, encrypted text, key used, timestamp
   - Sorted newest-first

### Key Types & Interfaces

```typescript
type CipherType = "caesar" | "vigenere" | "railfence" | "playfair" | null;

interface HistoryEntry {
  id: string; // Timestamp-based unique ID
  cipher: CipherType; // Which cipher was used
  original: string; // Original plaintext
  encrypted: string; // Encrypted result
  decrypted: string; // Decrypted result (if applicable)
  key: string; // The key used
  timestamp: number; // ms since epoch
}
```

## Cipher Algorithms

### Caesar Cipher (`src/services/ciphers/caesar.ts`)

- **Key**: Numeric shift (1-25)
- **Logic**: Rotates each letter by fixed amount, wraps A-Z
- **Preserves**: Case, non-alphabetic characters
- **Decrypt**: Reverse shift (26 - shift)

### Vigenere Cipher (`src/services/ciphers/vigenere.ts`)

- **Key**: Text string/keyword
- **Logic**: Repeating key determines shift per letter
- **Preserves**: Case, spaces, punctuation (skips over non-letters in key cycling)
- **Example**: key="PYTHON", "HELLO" → shift by P(15) Y(24) T(19) H(7) O(14)

### Rail Fence Cipher (`src/services/ciphers/railfence.ts`)

- **Key**: Number of rails (2-5)
- **Logic**: Write message in zigzag pattern, read rail-by-rail
- **Example**: 3 rails, "HELLOWORLD" → rows [H,L,O,R], [E,L,W,L], [L,O,D] → "HLORELLWLLOD"
- **Decrypt**: Reconstruct zigzag based on rail counts

### Playfair Cipher (`src/services/ciphers/playfair.ts`)

- **Key**: Text keyword
- **Logic**:
  1. Create 5×5 grid from key + alphabet (I/J merged)
  2. Split plaintext into digraphs (pairs), pad with 'x' if odd
  3. For each pair: if same row→shift right, same column→shift down, rectangle→swap corners
- **Preserves**: Grid-based substitution rules

## Component Development Patterns

### Adding a New Component

1. Create file in `src/components/YourComponent.tsx`
2. Accept props as `interface Props { ... }`
3. Use Tailwind Spotify colors: `bg-spotify-dark`, `text-text-base`, etc.
4. Example:

```tsx
interface CipherMenuProps {
  selectedCipher: CipherType;
  onSelectCipher: (cipher: CipherType) => void;
}

export const CipherMenu: React.FC<CipherMenuProps> = ({
  selectedCipher,
  onSelectCipher,
}) => {
  return (
    <button
      className={
        selectedCipher === "caesar"
          ? "bg-spotify-green text-spotify-black"
          : "bg-spotify-dark"
      }
      onClick={() => onSelectCipher("caesar")}
    >
      Caesar
    </button>
  );
};
```

### Adding a New Cipher

1. Create file in `src/services/ciphers/yourcipher.ts`
2. Export `encrypt(text: string, key: string | number): string`
3. Export `decrypt(text: string, key: string | number): string`
4. Update `src/services/ciphers/index.ts` to register it:

```typescript
import { yourencrypt, youdecrypt } from "./yourcipher";
yourcipher: {
  encrypt: (text, key) => yourencrypt(text, String(key)),
  decrypt: (text, key) => youdecrypt(text, String(key)),
}
```

5. Add to `CipherType` union
6. Add to CIPHERS array in `CipherMenu.tsx`

## Styling & Colors

The project uses **Spotify's dark theme** extended in Tailwind:

- **Background**: `bg-spotify-black` (#121212)
- **Surfaces**: `bg-spotify-dark` (#181818), `bg-spotify-surface` (#1f1f1f)
- **Accent**: `bg-spotify-green` (#1ed760) — buttons, highlights
- **Text**: `text-text-base` (#ffffff), `text-text-secondary` (#b3b3b3)
- **Borders**: `border-border-gray` (#4d4d4d)

All colors defined in `tailwind.config.ts` and `src/index.css`. No custom colors—extend theme config if new shades needed.

## Development Workflow

### Commands

| Command           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Vite dev server at http://localhost:5173 |
| `npm run build`   | TypeScript check + prod build to `dist/` |
| `npm run lint`    | ESLint check (strict, no unused vars)    |
| `npm run preview` | Preview prod build locally               |

### TypeScript Strictness

- No unused imports/variables (linter enforced)
- All React components: `React.FC<Props>`
- Always type props interfaces
- ES2023 target

## Common Workflows

### Debugging Cipher Logic

1. Add test cases in component (e.g., plaintext input fields)
2. Log cipher.encrypt/decrypt output to console
3. Verify against known test vectors from `README.md`

### Adding Error Handling

- Wrap cipher calls in try-catch in `EncryptionPanel.tsx`
- Display error message in red box at top: `{error && <div className="bg-text-negative">...`
- Example: Playfair requires letters-only, Vigenere needs non-empty keyword

### Extending History

- `HistoryEntry` is immutable; create new object via spread or constructor
- Add to front of array (newest first): `setHistory([newEntry, ...history])`
- Clear all: `setHistory([])` button already in App.tsx

## Files to Know

| File                            | Purpose                                           |
| ------------------------------- | ------------------------------------------------- |
| `src/App.tsx`                   | App state, layout, menu/panel/history composition |
| `src/components/`               | UI components (menu, encryption, history)         |
| `src/services/ciphers/index.ts` | Cipher factory & types                            |
| `tailwind.config.ts`            | Spotify color/typography theme                    |
| `package.json`                  | Build scripts, React 19 + Tailwind 4.2            |

## AI Agent Prompt Template

> "Add [feature] to misisipi-cipher cipher app. Use the CipherType union and HistoryEntry interface. Keep UI in [components/]. Cipher logic in [services/ciphers/]. Use Spotify colors: bg-spotify-dark, text-text-base, bg-spotify-green for accents. No unused imports; verify TypeScript strict mode passes."

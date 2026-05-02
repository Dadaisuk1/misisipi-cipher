/**
 * Playfair Cipher
 * Uses a 5x5 grid to encrypt pairs of letters (digraphs)
 * Key: text string (typically 4-8 characters, no 'J')
 *
 * Algorithm Details:
 * 1. Remove spaces/punctuation, replace J with I
 * 2. Insert X between adjacent duplicate letters (e.g., EE → EXE)
 * 3. Pad with X if plaintext length is odd
 * 4. Encrypt digraphs using Playfair rules:
 *    - Same row: shift right (wrap around)
 *    - Same column: shift down (wrap around)
 *    - Rectangle: swap corners
 *
 * Test Cases:
 * - MEET ME (key: SECRET) → ITWCGUCW ✓
 * - ATTACK AT DAWN (key: MONARCHY) → RSZSMBIRZKNXAW ✓
 *
 * Note: This implementation produces correct Playfair encryption.
 * Output may differ from some textbook examples due to variant implementations.
 */

const createPlayfairGrid = (key: string): string[][] => {
  const keyChars: string[] = [];
  const seen = new Set<string>();

  // Process key
  for (const char of key.toUpperCase()) {
    if (/[A-Z]/.test(char)) {
      const c = char === 'J' ? 'I' : char;
      if (!seen.has(c)) {
        seen.add(c);
        keyChars.push(c);
      }
    }
  }

  // Fill remaining alphabet (no J)
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  for (const char of alphabet) {
    if (!seen.has(char)) {
      keyChars.push(char);
    }
  }

  // Build 5x5 grid
  const grid: string[][] = [];
  for (let i = 0; i < 5; i++) {
    grid.push(keyChars.slice(i * 5, (i + 1) * 5));
  }

  return grid;
};

const findPosition = (grid: string[][], char: string): [number, number] => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (grid[i][j] === char) {
        return [i, j];
      }
    }
  }
  throw new Error(`Character not found: ${char}`);
};

const preparePlaintext = (plaintext: string): string => {
  let cleaned = '';

  // Remove non-letters, replace J with I
  for (const char of plaintext.toUpperCase()) {
    if (/[A-Z]/.test(char)) {
      cleaned += char === 'J' ? 'I' : char;
    }
  }

  // Insert X between adjacent duplicate letters before pairing
  let withXs = '';
  for (let i = 0; i < cleaned.length; i++) {
    withXs += cleaned[i];
    // If this char equals the next char, insert X
    if (cleaned[i] === cleaned[i + 1]) {
      withXs += 'X';
    }
  }

  // If odd length, pad with X
  if (withXs.length % 2 === 1) {
    withXs += 'X';
  }

  return withXs;
};

export const playfair = {
  encrypt: (plaintext: string, key: string): string => {
    if (!key) throw new Error('Key cannot be empty');

    const grid = createPlayfairGrid(key);
    const prepared = preparePlaintext(plaintext);

    let ciphertext = '';

    for (let i = 0; i < prepared.length; i += 2) {
      const char1 = prepared[i];
      const char2 = prepared[i + 1];

      const [row1, col1] = findPosition(grid, char1);
      const [row2, col2] = findPosition(grid, char2);

      if (row1 === row2) {
        ciphertext += grid[row1][(col1 + 1) % 5];
        ciphertext += grid[row2][(col2 + 1) % 5];
      } else if (col1 === col2) {
        ciphertext += grid[(row1 + 1) % 5][col1];
        ciphertext += grid[(row2 + 1) % 5][col2];
      } else {
        ciphertext += grid[row1][col2];
        ciphertext += grid[row2][col1];
      }
    }

    return ciphertext;
  },

  decrypt: (ciphertext: string, key: string): string => {
    if (!key) throw new Error('Key cannot be empty');

    const grid = createPlayfairGrid(key);

    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i += 2) {
      const char1 = ciphertext[i];
      const char2 = ciphertext[i + 1];

      const [row1, col1] = findPosition(grid, char1);
      const [row2, col2] = findPosition(grid, char2);

      if (row1 === row2) {
        plaintext += grid[row1][(col1 - 1 + 5) % 5];
        plaintext += grid[row2][(col2 - 1 + 5) % 5];
      } else if (col1 === col2) {
        plaintext += grid[(row1 - 1 + 5) % 5][col1];
        plaintext += grid[(row2 - 1 + 5) % 5][col2];
      } else {
        plaintext += grid[row1][col2];
        plaintext += grid[row2][col1];
      }
    }

    return plaintext;
  },

  getPreparedText: (plaintext: string): string => {
    return preparePlaintext(plaintext);
  },
};

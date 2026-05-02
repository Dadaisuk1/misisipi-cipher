/**
 * Playfair Cipher
 * Uses a 5x5 grid to encrypt pairs of letters (digraphs)
 * Key: text string (typically 4-8 characters, no 'J')
 */

const createPlayfairGrid = (key: string): string[][] => {
  // Remove duplicates and convert to uppercase
  const keyChars = new Set<string>();
  for (const char of key.toUpperCase()) {
    if (/[A-Z]/.test(char) && char !== 'J') {
      keyChars.add(char);
    }
  }

  // Create alphabet without 'J'
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note: no J
  const gridChars = [...keyChars];

  for (const char of alphabet) {
    if (!gridChars.includes(char)) {
      gridChars.push(char);
    }
  }

  // Create 5x5 grid
  const grid: string[][] = [];
  for (let i = 0; i < 5; i++) {
    grid[i] = gridChars.slice(i * 5, (i + 1) * 5);
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
  return [0, 0]; // Fallback (shouldn't happen)
};

const preparePlaintext = (plaintext: string): string => {
  let prepared = '';
  for (const char of plaintext.toUpperCase()) {
    if (/[A-Z]/.test(char)) {
      prepared += char === 'J' ? 'I' : char; // Replace J with I
    }
  }

  // Add padding 'X' if needed for odd length
  if (prepared.length % 2 !== 0) {
    prepared += 'X';
  }

  return prepared;
};

export const playfair = {
  encrypt: (plaintext: string, key: string): string => {
    if (!key || key.length === 0) {
      throw new Error('Key cannot be empty');
    }

    const grid = createPlayfairGrid(key);
    const prepared = preparePlaintext(plaintext);

    let ciphertext = '';

    for (let i = 0; i < prepared.length; i += 2) {
      const char1 = prepared[i];
      const char2 = prepared[i + 1];

      const [row1, col1] = findPosition(grid, char1);
      const [row2, col2] = findPosition(grid, char2);

      if (row1 === row2) {
        // Same row: shift right with wrap-around
        ciphertext += grid[row1][(col1 + 1) % 5];
        ciphertext += grid[row2][(col2 + 1) % 5];
      } else if (col1 === col2) {
        // Same column: shift down with wrap-around
        ciphertext += grid[(row1 + 1) % 5][col1];
        ciphertext += grid[(row2 + 1) % 5][col2];
      } else {
        // Rectangle: swap columns
        ciphertext += grid[row1][col2];
        ciphertext += grid[row2][col1];
      }
    }

    return ciphertext;
  },

  decrypt: (ciphertext: string, key: string): string => {
    if (!key || key.length === 0) {
      throw new Error('Key cannot be empty');
    }

    const grid = createPlayfairGrid(key);

    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i += 2) {
      const char1 = ciphertext[i];
      const char2 = ciphertext[i + 1];

      const [row1, col1] = findPosition(grid, char1);
      const [row2, col2] = findPosition(grid, char2);

      if (row1 === row2) {
        // Same row: shift left with wrap-around
        plaintext += grid[row1][(col1 - 1 + 5) % 5];
        plaintext += grid[row2][(col2 - 1 + 5) % 5];
      } else if (col1 === col2) {
        // Same column: shift up with wrap-around
        plaintext += grid[(row1 - 1 + 5) % 5][col1];
        plaintext += grid[(row2 - 1 + 5) % 5][col2];
      } else {
        // Rectangle: swap columns
        plaintext += grid[row1][col2];
        plaintext += grid[row2][col1];
      }
    }

    return plaintext;
  }
};

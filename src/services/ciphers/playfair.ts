// Playfair Cipher: Digraph substitution using a 5x5 grid
const createPlayfairGrid = (key: string): string[] => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const gridKey = key
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/j/g, "i");

  let grid = "";
  const seen = new Set<string>();

  // Add unique key characters
  for (const char of gridKey) {
    if (!seen.has(char)) {
      grid += char;
      seen.add(char);
    }
  }

  // Add remaining alphabet
  for (const char of alphabet) {
    if (!seen.has(char)) {
      grid += char;
    }
  }

  return grid.split("");
};

const findPosition = (grid: string[], char: string): [number, number] => {
  const index = grid.indexOf(char);
  return [Math.floor(index / 5), index % 5];
};

const preparePlaintext = (text: string): string => {
  let prepared = text
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/j/g, "i");

  // Insert 'x' between repeated letters and at end if odd length
  let result = "";
  for (let i = 0; i < prepared.length; i++) {
    result += prepared[i];
    if (i < prepared.length - 1 && prepared[i] === prepared[i + 1]) {
      result += "x";
    }
  }

  if (result.length % 2 === 1) result += "x";

  return result;
};

export const playfairEncrypt = (text: string, key: string): string => {
  const grid = createPlayfairGrid(key);
  const prepared = preparePlaintext(text);

  let result = "";
  for (let i = 0; i < prepared.length; i += 2) {
    const char1 = prepared[i];
    const char2 = prepared[i + 1];

    const [row1, col1] = findPosition(grid, char1);
    const [row2, col2] = findPosition(grid, char2);

    if (row1 === row2) {
      // Same row: shift right
      result += grid[row1 * 5 + ((col1 + 1) % 5)];
      result += grid[row2 * 5 + ((col2 + 1) % 5)];
    } else if (col1 === col2) {
      // Same column: shift down
      result += grid[((row1 + 1) % 5) * 5 + col1];
      result += grid[((row2 + 1) % 5) * 5 + col2];
    } else {
      // Rectangle: swap columns
      result += grid[row1 * 5 + col2];
      result += grid[row2 * 5 + col1];
    }
  }

  return result;
};

export const playfairDecrypt = (text: string, key: string): string => {
  const grid = createPlayfairGrid(key);

  let result = "";
  for (let i = 0; i < text.length; i += 2) {
    const char1 = text[i];
    const char2 = text[i + 1];

    const [row1, col1] = findPosition(grid, char1);
    const [row2, col2] = findPosition(grid, char2);

    if (row1 === row2) {
      // Same row: shift left
      result += grid[row1 * 5 + ((col1 - 1 + 5) % 5)];
      result += grid[row2 * 5 + ((col2 - 1 + 5) % 5)];
    } else if (col1 === col2) {
      // Same column: shift up
      result += grid[((row1 - 1 + 5) % 5) * 5 + col1];
      result += grid[((row2 - 1 + 5) % 5) * 5 + col2];
    } else {
      // Rectangle: swap columns
      result += grid[row1 * 5 + col2];
      result += grid[row2 * 5 + col1];
    }
  }

  return result.replace(/x+$/, ""); // Remove trailing 'x' padding
};

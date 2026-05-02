/**
 * Caesar Cipher
 * Shifts each letter by a fixed number of positions in the alphabet
 * Key: number between 1 and 25
 */

export const caesar = {
  encrypt: (plaintext: string, key: number): string => {
    if (key < 1 || key > 25) {
      throw new Error('Key must be between 1 and 25');
    }

    return plaintext
      .split('')
      .map((char) => {
        if (/[A-Z]/.test(char)) {
          const charCode = char.charCodeAt(0) - 65;
          const shifted = (charCode + key) % 26;
          return String.fromCharCode(shifted + 65);
        }
        if (/[a-z]/.test(char)) {
          const charCode = char.charCodeAt(0) - 97;
          const shifted = (charCode + key) % 26;
          return String.fromCharCode(shifted + 97);
        }
        return char; // Keep non-alphabetic characters
      })
      .join('');
  },

  decrypt: (ciphertext: string, key: number): string => {
    if (key < 1 || key > 25) {
      throw new Error('Key must be between 1 and 25');
    }

    return ciphertext
      .split('')
      .map((char) => {
        if (/[A-Z]/.test(char)) {
          const charCode = char.charCodeAt(0) - 65;
          const shifted = (charCode - key + 26) % 26;
          return String.fromCharCode(shifted + 65);
        }
        if (/[a-z]/.test(char)) {
          const charCode = char.charCodeAt(0) - 97;
          const shifted = (charCode - key + 26) % 26;
          return String.fromCharCode(shifted + 97);
        }
        return char; // Keep non-alphabetic characters
      })
      .join('');
  }
};

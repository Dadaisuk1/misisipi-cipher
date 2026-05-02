/**
 * Vigenere Cipher
 * Uses a repeating keyword to shift letters by variable amounts
 * Key: text string (any length, no numbers)
 */

export const vigenere = {
  encrypt: (plaintext: string, key: string): string => {
    if (!key || key.length === 0) {
      throw new Error('Key cannot be empty');
    }

    const keyUpper = key.toUpperCase();
    let keyIndex = 0;

    return plaintext
      .split('')
      .map((char) => {
        if (/[A-Z]/.test(char)) {
          const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
          const charCode = char.charCodeAt(0) - 65;
          const shifted = (charCode + shift) % 26;
          keyIndex++;
          return String.fromCharCode(shifted + 65);
        }
        if (/[a-z]/.test(char)) {
          const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
          const charCode = char.charCodeAt(0) - 97;
          const shifted = (charCode + shift) % 26;
          keyIndex++;
          return String.fromCharCode(shifted + 97);
        }
        return char; // Keep non-alphabetic characters
      })
      .join('');
  },

  decrypt: (ciphertext: string, key: string): string => {
    if (!key || key.length === 0) {
      throw new Error('Key cannot be empty');
    }

    const keyUpper = key.toUpperCase();
    let keyIndex = 0;

    return ciphertext
      .split('')
      .map((char) => {
        if (/[A-Z]/.test(char)) {
          const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
          const charCode = char.charCodeAt(0) - 65;
          const shifted = (charCode - shift + 26) % 26;
          keyIndex++;
          return String.fromCharCode(shifted + 65);
        }
        if (/[a-z]/.test(char)) {
          const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
          const charCode = char.charCodeAt(0) - 97;
          const shifted = (charCode - shift + 26) % 26;
          keyIndex++;
          return String.fromCharCode(shifted + 97);
        }
        return char; // Keep non-alphabetic characters
      })
      .join('');
  }
};

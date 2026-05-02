/**
 * Rail Fence Cipher (Zig-Zag Cipher)
 * Writes plaintext in a zigzag pattern across N rails, then reads off rail by rail
 * Key: number of rails (2-5)
 */

export const railFence = {
  encrypt: (plaintext: string, numRails: number): string => {
    if (numRails < 2 || numRails > 5) {
      throw new Error('Number of rails must be between 2 and 5');
    }

    if (numRails === 1) {
      return plaintext;
    }

    // Create rails (array of strings)
    const rails: string[] = Array.from({ length: numRails }, () => '');

    // Direction: 1 = down, -1 = up
    let rail = 0;
    let direction = 1;

    for (const char of plaintext) {
      rails[rail] += char;

      if (rail === 0) {
        direction = 1;
      } else if (rail === numRails - 1) {
        direction = -1;
      }

      rail += direction;
    }

    return rails.join('');
  },

  decrypt: (ciphertext: string, numRails: number): string => {
    if (numRails < 2 || numRails > 5) {
      throw new Error('Number of rails must be between 2 and 5');
    }

    if (numRails === 1) {
      return ciphertext;
    }

    const length = ciphertext.length;

    // Calculate the length of each rail in the encrypted text
    const railLengths: number[] = Array.from({ length: numRails }, () => 0);

    let rail = 0;
    let direction = 1;

    for (let i = 0; i < length; i++) {
      railLengths[rail]++;

      if (rail === 0) {
        direction = 1;
      } else if (rail === numRails - 1) {
        direction = -1;
      }

      rail += direction;
    }

    // Split the ciphertext into rails
    const rails: string[] = [];
    let index = 0;

    for (let i = 0; i < numRails; i++) {
      rails[i] = ciphertext.substring(index, index + railLengths[i]);
      index += railLengths[i];
    }

    // Reconstruct plaintext
    let plaintext = '';
    const railIndices: number[] = Array.from({ length: numRails }, () => 0);

    rail = 0;
    direction = 1;

    for (let i = 0; i < length; i++) {
      plaintext += rails[rail][railIndices[rail]];
      railIndices[rail]++;

      if (rail === 0) {
        direction = 1;
      } else if (rail === numRails - 1) {
        direction = -1;
      }

      rail += direction;
    }

    return plaintext;
  }
};

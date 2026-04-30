// Vigenere Cipher: Polyalphabetic substitution using a keyword
const normalizeKey = (key: string): string => {
  return key.toLowerCase().replace(/[^a-z]/g, "");
};

export const vigenereEncrypt = (text: string, key: string): string => {
  const normalizedKey = normalizeKey(key);
  if (!normalizedKey) throw new Error("Key must contain at least one letter");

  let keyIndex = 0;
  return text
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const shift = normalizedKey.charCodeAt(keyIndex % normalizedKey.length) - 97;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      if (/[A-Z]/.test(char)) {
        const shift = normalizedKey.charCodeAt(keyIndex % normalizedKey.length) - 97;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    })
    .join("");
};

export const vigenereDecrypt = (text: string, key: string): string => {
  const normalizedKey = normalizeKey(key);
  if (!normalizedKey) throw new Error("Key must contain at least one letter");

  let keyIndex = 0;
  return text
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const shift = normalizedKey.charCodeAt(keyIndex % normalizedKey.length) - 97;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      }
      if (/[A-Z]/.test(char)) {
        const shift = normalizedKey.charCodeAt(keyIndex % normalizedKey.length) - 97;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      return char;
    })
    .join("");
};

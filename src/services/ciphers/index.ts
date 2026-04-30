import { caesarEncrypt, caesarDecrypt } from "./caesar";
import { vigenereEncrypt, vigenereDecrypt } from "./vigenere";
import { railFenceEncrypt, railFenceDecrypt } from "./railfence";
import { playfairEncrypt, playfairDecrypt } from "./playfair";

export type CipherType = "caesar" | "vigenere" | "railfence" | "playfair";

export interface CipherOperation {
  encrypt: (text: string, key: string | number) => string;
  decrypt: (text: string, key: string | number) => string;
}

const ciphers: Record<CipherType, CipherOperation> = {
  caesar: {
    encrypt: (text, key) => caesarEncrypt(text, Number(key)),
    decrypt: (text, key) => caesarDecrypt(text, Number(key)),
  },
  vigenere: {
    encrypt: (text, key) => vigenereEncrypt(text, String(key)),
    decrypt: (text, key) => vigenereDecrypt(text, String(key)),
  },
  railfence: {
    encrypt: (text, key) => railFenceEncrypt(text, Number(key)),
    decrypt: (text, key) => railFenceDecrypt(text, Number(key)),
  },
  playfair: {
    encrypt: (text, key) => playfairEncrypt(text, String(key)),
    decrypt: (text, key) => playfairDecrypt(text, String(key)),
  },
};

export const getCipher = (type: CipherType): CipherOperation => {
  return ciphers[type];
};

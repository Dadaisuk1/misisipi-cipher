// Caesar Cipher: Simple substitution with fixed shift
export const caesarEncrypt = (text: string, key: number): string => {
  const shift = key % 26;
  return text
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      if (/[A-Z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    })
    .join("");
};

export const caesarDecrypt = (text: string, key: number): string => {
  return caesarEncrypt(text, 26 - (key % 26));
};

// Rail Fence Cipher: Zigzag transposition cipher
export const railFenceEncrypt = (text: string, key: number): string => {
  if (key <= 1) return text;

  const rails: string[] = Array(key).fill("");
  let rail = 0;
  let direction = 1;

  for (const char of text) {
    rails[rail] += char;
    if (rail === 0) direction = 1;
    else if (rail === key - 1) direction = -1;
    rail += direction;
  }

  return rails.join("");
};

export const railFenceDecrypt = (text: string, key: number): string => {
  if (key <= 1) return text;

  const railLengths: number[] = Array(key).fill(0);
  let rail = 0;
  let direction = 1;

  // Calculate how many characters go in each rail
  for (let i = 0; i < text.length; i++) {
    railLengths[rail]++;
    if (rail === 0) direction = 1;
    else if (rail === key - 1) direction = -1;
    rail += direction;
  }

  // Fill rails with characters
  const rails: string[] = [];
  let index = 0;
  for (let i = 0; i < key; i++) {
    rails[i] = text.substring(index, index + railLengths[i]);
    index += railLengths[i];
  }

  // Read zigzag pattern
  let result = "";
  rail = 0;
  direction = 1;
  const railIndex: number[] = Array(key).fill(0);

  for (let i = 0; i < text.length; i++) {
    result += rails[rail][railIndex[rail]++];
    if (rail === 0) direction = 1;
    else if (rail === key - 1) direction = -1;
    rail += direction;
  }

  return result;
};

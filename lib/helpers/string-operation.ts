export function trimText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function concatIPs(host: string, prodLineIP: string): string {
  return `${host}, ${prodLineIP}`;
}
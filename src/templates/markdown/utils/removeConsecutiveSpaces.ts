export function removeConsecutiveSpaces(str: string): string {
  return str.replace(/ +/g, ' ');
}

export function trim(str: string): string {
  return str.replace(/^\n+|\n+$/g, '').trim();
}

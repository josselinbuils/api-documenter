export function getUnscopedName(name: string): string {
  const matches = name.match(/@[^/]+\/(.*)/);
  return matches !== null ? matches[1] : name;
}

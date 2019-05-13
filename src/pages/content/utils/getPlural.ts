export function getPlural(word: string): string {
  switch (word.slice(-1)) {
    case 's':
      return `${word}es`;

    case 'y':
      return `${word.slice(0, -1)}ies`;

    default:
      return `${word}s`;
  }
}

/**
 * Allows listening keyboard events.
 */
export declare function useKeyMap(
  keyMap: {
    [keyStr: string]: (event: KeyboardEvent) => false | any;
  },
  active?: boolean,
  priority?: number
): void;

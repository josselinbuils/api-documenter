/**
 * Allows managing lists easily.
 */
export declare function useList<T>(
  initialValues?: T[] | (() => T[])
): [T[], ListManager<T>];
/**
 * Manager provided by useList.
 */
export interface ListManager<T> {
  clear(): void;
  push(...items: T[]): void;
  set(items: T[] | ((currentItems: T[]) => T[])): void;
  update(): void;
}

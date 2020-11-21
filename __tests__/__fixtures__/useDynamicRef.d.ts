import { MutableRefObject } from 'react';
/**
 * Allows not re-executing React effects when a reference changes.
 *
 * A good use case is when you call a callback provided as parameter/prop in an
 * effect: it will ensure that your effect will not be executed again each time
 * the callback reference changes.
 */
export declare function useDynamicRef<T>(value: T): MutableRefObject<T>;

import { RefObject } from 'react';
/**
 * Allows detecting when a given element is displayed in the viewport.
 */
export declare function useLazy<T extends HTMLElement>(
  elementRef: RefObject<T>,
  enabled?: boolean
): {
  hasBeenDisplayed: boolean;
};

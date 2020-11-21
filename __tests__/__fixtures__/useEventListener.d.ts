/**
 * Allows listening window events with automatic cleaning.
 */
export declare function useEventListener<
  EventType extends keyof WindowEventMap
>(
  eventType: EventType,
  handler: (event: WindowEventMap[EventType]) => void,
  active?: boolean
): void;

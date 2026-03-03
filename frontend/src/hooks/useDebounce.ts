import { useEffect, useState } from "react";
/**
 * useDebounce<T>()
 *
 * Generic debounce hook that delays updating a value until
 * after a specified delay period has passed without changes.
 *
 * Responsibilities:
 * - Returns a debounced version of the provided value.
 * - Resets the debounce timer whenever `value` or `delay` changes.
 * - Cancels pending timers on cleanup to prevent memory leaks.
 *
 * Use Cases:
 * - Delaying API calls while typing.
 * - Reducing unnecessary re-renders or expensive computations.
 *
 * Notes:
 * - The debouncing logic was implemented by the developer.
 * - Initial hook structure was created with the assistance of AI.
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}
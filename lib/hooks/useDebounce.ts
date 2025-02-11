import { useEffect, useState } from 'react';

/**
 *
 * A React hook that Delays updating the value until after the specified delay.
 *
 * @param value The value to debounce
 * @param delay The debounce delay in milliseconds (default is 300ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

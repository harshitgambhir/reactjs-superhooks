import { useState, useEffect } from 'react';

/**
 * Represents the dimensions of the browser window.
 */
type WindowSize = {
  width: number;
  height: number;
};

/**
 * A React hook that tracks the browser window size and updates dynamically on resize.
 *
 * @returns {WindowSize} An object containing `{ width, height }` representing the window's current size.
 */

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: window?.innerWidth || 0,
    height: window?.innerHeight || 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

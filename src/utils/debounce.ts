import { useState, useEffect } from 'react';

// TypeScript debounce hook
export function useDebounce<T>(cb: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(cb);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(cb);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cb, delay]);

  return debounceValue;
}

// Debounce utility function with TypeScript
type CallbackFunction = (...args: any[]) => void;

const debounce = (callback: CallbackFunction, wait: number): CallbackFunction => {
  let timeoutId: number | null = null;

  return (...args: any[]) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

export default debounce;

import { useEffect } from 'react';

export function useLockBodyScroll(locked = false) {
  useEffect(() => {
    if (!locked) {
      return () => {};
    }

    const target = document.documentElement;
    const originalOverflow = target.style.overflow;

    target.style.overflow = 'hidden';

    return () => {
      target.style.overflow = originalOverflow;
    };
  }, [locked]);
}

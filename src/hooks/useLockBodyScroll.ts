import { useEffect, useState } from 'react';

export function useLockBodyScroll(
  initialLocked = false,
  rootId = '__next'
): [boolean, (locked: boolean) => void] {
  const [locked, setLocked] = useState(initialLocked);

  useEffect(() => {
    if (!locked) {
      return () => {};
    }

    const target = document.documentElement;
    const originalOverflow = target.style.overflow;
    const originalPaddingRight = target.style.paddingRight;

    target.style.overflow = 'hidden';

    const root = document.getElementById(rootId);
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    if (scrollBarWidth) {
      target.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      target.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        target.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked, rootId]);

  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}

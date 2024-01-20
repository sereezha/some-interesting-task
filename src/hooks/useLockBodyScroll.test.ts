import { renderHook } from '@testing-library/react';
import { useLockBodyScroll } from './useLockBodyScroll';

describe('useLockBodyScroll', () => {
  it('should remove scroll if `true` was passed', () => {
    renderHook(() => useLockBodyScroll(true));

    expect(document.documentElement.style.overflow).toEqual('hidden');
  });

  it('should restore scroll on unmount', () => {
    const { unmount } = renderHook(() => useLockBodyScroll(true));

    unmount();

    expect(document.documentElement.style.overflow).not.toEqual('hidden');
  });
});

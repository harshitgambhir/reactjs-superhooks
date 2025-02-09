import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../../hooks/useWindowSize';

const resizeWindow = (width: number, height: number) => {
  (window.innerWidth as number) = width;
  (window.innerHeight as number) = height;
  window.dispatchEvent(new Event('resize'));
};

describe('useWindowSize Hook', () => {
  it('should return the initial window size', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it('should update width and height on window resize', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      resizeWindow(800, 600);
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);

    act(() => {
      resizeWindow(1024, 768);
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should not update state when unmounted', () => {
    const { result, unmount } = renderHook(() => useWindowSize());

    unmount();

    act(() => {
      resizeWindow(500, 500);
    });

    expect(result.current.width).not.toBe(500);
    expect(result.current.height).not.toBe(500);
  });
});

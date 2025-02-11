import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce Hook', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should update the value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 500 } },
    );

    rerender({ value: 'updated', delay: 500 });

    // Value should not update before the delay
    expect(result.current).toBe('test');

    // Fast-forward the timer
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset the timeout if value changes quickly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 500 } },
    );

    rerender({ value: 'intermediate', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300); // Before the delay is reached
    });

    rerender({ value: 'final', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500); // After the final delay
    });

    expect(result.current).toBe('final');
  });
});

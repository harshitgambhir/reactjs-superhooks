import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const originalLocalStorage = global.localStorage;
  const mockLocalStorage = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    global.localStorage = mockLocalStorage as any;
    mockLocalStorage.clear();
  });

  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });

  it('should read from localStorage on client', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value'),
    );

    expect(result.current[0]).toBe('stored-value');
  });

  it('should write to localStorage when state changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value'),
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
    expect(result.current[0]).toBe('new-value');
  });

  it('should sync state across tabs when storage event occurs', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value'),
    );

    act(() => {
      localStorage.setItem('test-key', JSON.stringify('updated-value'));
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('updated-value'),
        }),
      );
    });

    expect(result.current[0]).toBe('updated-value');
  });

  it('should handle non-existent localStorage key', () => {
    const { result } = renderHook(() =>
      useLocalStorage('non-existent-key', 'default-value'),
    );

    expect(result.current[0]).toBe('default-value');
  });

  it('should not fail if localStorage is unavailable', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const storageSpy = jest.spyOn(global, 'localStorage', 'get');
    storageSpy.mockImplementation(() => {
      throw new Error('');
    });

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value'),
    );

    expect(result.current[0]).toBe('initial-value');

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');

    storageSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should sync default value if localStorage key is empty', () => {
    localStorage.setItem('test-key', '');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default-value'),
    );

    expect(result.current[0]).toBe('default-value');
  });

  it('should return undefined for string "undefined"', () => {
    localStorage.setItem('test-key', 'undefined');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default-value'),
    );

    expect(result.current[0]).toBeUndefined();
  });

  it('should return undefined for invalid json', () => {
    localStorage.setItem('test-key', '{"key": value}');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', '{"key": value}'),
    );

    expect(result.current[0]).toBeUndefined();
  });
});

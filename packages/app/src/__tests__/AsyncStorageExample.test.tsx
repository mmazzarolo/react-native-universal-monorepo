import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, screen } from './utils/test-utils';
import { AsyncStorageExample } from '../AsyncStorageExample';

describe('AsyncStorageExample Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { toJSON } = render(<AsyncStorageExample />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays initial empty value', () => {
    render(<AsyncStorageExample />);
    expect(screen.getByText('Value: ""')).toBeTruthy();
  });

  it('renders "Set value" button', () => {
    render(<AsyncStorageExample />);
    expect(screen.getByText('Set value')).toBeTruthy();
  });

  it('renders "Remove value" button', () => {
    render(<AsyncStorageExample />);
    expect(screen.getByText('Remove value')).toBeTruthy();
  });

  it('sets value in AsyncStorage when "Set value" is pressed', async () => {
    render(<AsyncStorageExample />);

    const setButton = screen.getByText('Set value');
    fireEvent.press(setButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('Hello from AsyncStorage')
      );
    });
  });

  it('removes value from AsyncStorage when "Remove value" is pressed', async () => {
    render(<AsyncStorageExample />);

    const removeButton = screen.getByText('Remove value');
    fireEvent.press(removeButton);

    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalled();
    });
  });

  it('updates displayed value after setting', async () => {
    const mockValue = 'Hello from AsyncStorage! 🔥';
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockValue);

    render(<AsyncStorageExample />);

    const setButton = screen.getByText('Set value');
    fireEvent.press(setButton);

    await waitFor(() => {
      expect(screen.getByText(`Value: "${mockValue}"`)).toBeTruthy();
    });
  });

  it('clears displayed value after removing', async () => {
    // First set a value
    const mockValue = 'Hello from AsyncStorage! 🔥';
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockValue);

    render(<AsyncStorageExample />);

    const setButton = screen.getByText('Set value');
    fireEvent.press(setButton);

    await waitFor(() => {
      expect(screen.getByText(`Value: "${mockValue}"`)).toBeTruthy();
    });

    // Then remove it
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const removeButton = screen.getByText('Remove value');
    fireEvent.press(removeButton);

    await waitFor(() => {
      expect(screen.getByText('Value: ""')).toBeTruthy();
    });
  });
});

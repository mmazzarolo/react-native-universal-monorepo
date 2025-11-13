import React from 'react';
import { Platform } from 'react-native';
import { render, screen } from './utils/test-utils';
import { App } from '../App';

describe('App Component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the welcome message', () => {
    render(<App />);
    expect(screen.getByText('Hello from React Native!')).toBeTruthy();
  });

  it('displays the platform', () => {
    render(<App />);
    expect(screen.getByText('Platform:')).toBeTruthy();
  });

  it('renders the logo image', () => {
    const { UNSAFE_getAllByType } = render(<App />);
    const images = UNSAFE_getAllByType('Image' as any);
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders AsyncStorageExample component', () => {
    render(<App />);
    // AsyncStorageExample renders a button with "Set value" text
    expect(screen.getByText('Set value')).toBeTruthy();
  });

  describe('Platform detection', () => {
    it('displays iOS platform', () => {
      (Platform as any).OS = 'ios';
      render(<App />);
      expect(screen.getByText('ios')).toBeTruthy();
    });

    it('displays Android platform', () => {
      (Platform as any).OS = 'android';
      render(<App />);
      expect(screen.getByText('android')).toBeTruthy();
    });
  });
});

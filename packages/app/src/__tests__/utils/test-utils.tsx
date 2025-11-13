import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';

/**
 * Custom render function that wraps components with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

/**
 * Re-export everything from React Testing Library
 */
export * from '@testing-library/react-native';
export { renderWithProviders as render };

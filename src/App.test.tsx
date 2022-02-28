import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Tax link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Tax/i);
  expect(linkElement).toBeInTheDocument();
});

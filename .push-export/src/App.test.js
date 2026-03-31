import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Exelus Labs branding', () => {
  render(<App />);
  expect(screen.getAllByText(/Exelus Labs/i).length).toBeGreaterThan(0);
});

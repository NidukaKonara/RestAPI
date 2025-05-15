// src/components/CountryList.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CountryList from './CountryList';
import { vi } from 'vitest';

// mock the hook
vi.mock('../hooks/useCountries', () => ({
  default: () => ({
    countries: [],
    loading: true,
    error: null,
    setSearchTerm: vi.fn(),
    setRegion: vi.fn(),
    setLanguage: vi.fn(),
    reload: vi.fn(),
  }),
}));

describe('CountryList', () => {
  it('displays loading text when loading is true', () => {
    render(<CountryList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

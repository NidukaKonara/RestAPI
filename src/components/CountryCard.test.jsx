// src/components/CountryCard.test.jsx
import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';


const country = {
  name: { common: 'Japan' },
  flags: { svg: 'https://flagcdn.com/jp.svg' },
  population: 125960000,
  region: 'Asia',
  cca3: 'JPN',
};

describe('CountryCard', () => {
  it('renders country name and region', () => {
    render(
      <MemoryRouter>
        <CountryCard country={country} />
      </MemoryRouter>
    );

    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText(/Asia/)).toBeInTheDocument();
  });
});

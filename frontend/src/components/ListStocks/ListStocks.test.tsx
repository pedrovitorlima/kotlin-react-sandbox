import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListStocks from './ListStocks';

describe('<ListStocks />', () => {
  test('it should mount', () => {
    // render(<ListStocks />);
    
    const listStocks = screen.getByTestId('ListStocks');

    expect(listStocks).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Wallet from './Wallet';

describe('<Wallet />', () => {
  test('it should mount', () => {
    render(<Wallet />);
    
    const wallet = screen.getByTestId('Wallet');

    expect(wallet).toBeInTheDocument();
  });
});
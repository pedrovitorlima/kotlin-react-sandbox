import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stock from './Stock';

describe('<Stock />', () => {
  it('should mount', () => {
    render(<Stock />);
    
    const stock = screen.getByTestId('Stock');

    expect(stock).toBeInTheDocument();
  });

  it('should render a component with all fields',  () => {
    render(<Stock />);
    expect(findComponent('ticker')).toBeInTheDocument();
    expect(findComponent('description')).toBeInTheDocument();
  });

  function findComponent(fieldName: string) {
    return screen.getByTestId(fieldName);
  }
});
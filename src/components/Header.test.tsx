import React from 'react';
import {render} from '@testing-library/react';
import Header from './Header';

it('header component', () => {
  const {getByText} = render(<Header />);
  
  expect(getByText(/Dog Poster Generator/i)).toBeTruthy();
})
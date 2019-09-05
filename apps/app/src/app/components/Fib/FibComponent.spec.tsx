import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { FibComponent } from './FibComponent';
//hello

describe('FibComponent', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(
        <FibComponent />
    );

    expect(baseElement).toBeTruthy();
  });
});

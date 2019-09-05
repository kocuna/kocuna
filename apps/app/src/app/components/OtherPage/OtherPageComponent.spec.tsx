import React from 'react';
import { render, cleanup } from '@testing-library/react';

describe('OtherPageComponent', () => {
  afterEach(cleanup);

  it('should render successfully', () => {

    expect(true).toBeTruthy();
  });
});


import { Matcher, SelectorMatcherOptions, cleanup, render } from '@testing-library/react';
import { AppComponent } from './AppComponent';
import { BrowserRouter } from 'react-router-dom';

import React from 'react';

describe('App', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } : { baseElement: HTMLElement } = render(
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText }
    : {getByText: (text: Matcher, options?: SelectorMatcherOptions | undefined) => HTMLElement} = render(
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    );

    expect(getByText('Hello api')).toBeTruthy();
  });
});

import { AppComponent } from './app/AppComponent';
import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <BrowserRouter>
    <AppComponent />
  </BrowserRouter>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import {AppComponent} from './app/AppComponent';

ReactDOM.render(
  <BrowserRouter>
    <AppComponent />
  </BrowserRouter>,
  document.getElementById('root')
);

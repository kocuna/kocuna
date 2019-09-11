import React from 'react';
import axios, { AxiosResponse } from 'axios';
import './AppComponent.scss';

import { BrowserRouter, Link, Router, Route } from 'react-router-dom';
import { FibComponent } from './components/Fib/FibComponent';
import { OtherPageComponent } from './components/OtherPage/OtherPageComponent';

export class AppComponent extends React.Component {
  
  public async componentDidMount() {
    try {
      const response = await axios.get('/api');
      
      console.log("response");  
      console.log(response);  
      // this.setState({
      //   numVisits: response.data.numVisits
      // });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Hello api</h1>
            <Link to="/" className="link">Home</Link>
            <Link to="/otherpage" className="link">Other Page</Link>
          </header>
          <div>
            <Route exact path="/" component={FibComponent} />
            <Route path="/otherpage" component={OtherPageComponent} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
};

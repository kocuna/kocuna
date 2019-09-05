import React from 'react';
import './OtherPageComponent.scss';
import { Link } from 'react-router-dom';

export class OtherPageComponent extends React.Component {

  public render(): JSX.Element {
    return (
      <div>
        I am Other Page!
        <Link to="/">Go back home</Link>
      </div>
    );
  }
};
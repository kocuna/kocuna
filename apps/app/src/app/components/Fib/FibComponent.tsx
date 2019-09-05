import React from 'react';
import './FibComponent.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface IState {
  seenIndexes: number[],
  values: {
    [key: number]: number
  },
  index: string
}

interface IProps {
}

interface IProps {
}
export class FibComponent extends React.Component<IProps, IState> {

  public state: IState = {
    seenIndexes: [],
    values: {},
    index: ''
  };
  public componentDidMount() {

  }

  public async fetchValues() {
    const values = await axios.get('/api/values/current');
    
    this.setState({
      values: values.data
    })
  }
  
  public async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    
    this.setState({
      seenIndexes: seenIndexes.data
    })
  }

  public renderSeenIndexes() {
    return this.state.seenIndexes.map((num: number) => num).join(', ');
  }

  public renderValues() {
    return Object.keys(this.state.values).map((key) => {
      return (
        <div key={key}>
          for index {key} I calculated {this.state.values[key]}}
        </div>
      );
    });
  }

  public async handleSubmit(event) {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    })
    this.setState({index: ''})
  }

  public render(): JSX.Element {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label htmlFor="">Enter your index:</label>
          <input
            value={this.state.index}

            onChange={(event) => this.setState({index: event.target.value})}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}
        <h3>Current values</h3>
        {this.renderValues()}
      </div>
    );
  }
};
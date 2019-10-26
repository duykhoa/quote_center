import React, { Component } from 'react';
import './App.css';
import { getQuotes } from './firebase_api/index';
import 'normalize.css/normalize.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = { quotes: [], end: 3, start: 0 };
  }

  componentDidMount() {
    getQuotes({}, snap => {
      this.setState({ quotes: snap });
    });
  }

  render() {
    const { quotes, start, end } = this.state;
    const renderedQuotes = quotes.slice(start, end).map((quote, index) => <li key={index}>{quote.body}</li>)

    return (
      <>
        <div className="formFields">
          <label>Start</label>
          <input defaultValue={this.state.start} onInput={(e) => {
            const start = e.target.value;
            start > 0 && start < quotes.length && this.setState({ start: start });
          }} type="range" placeholder="start" min={0} max={quotes.length}></input>
          {start}
        </div>

        <div className="formFields">
          <label>End</label>
          <input defaultValue={this.state.end} onInput={(e) => {
            const end = e.target.value;
            end > 0 && end <= quotes.length && this.setState({ end: end });
          }} type="range" placeholder="end" min={0} max={quotes.length}></input>
          {end}
        </div>

        <div className="Container">
          <ul className="QuotesList">
            {renderedQuotes}
          </ul>
        </div>
      </>
    );
  }
}
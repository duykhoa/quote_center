import React, { Component } from 'react';
import './App.css';
import { getQuotes } from './firebase_api/index';
import 'normalize.css/normalize.css';
import createConversationScript from './createConversationScript';

export default class App extends Component {
  constructor() {
    super();
    this.state = {quotes: [], actions: ["showQuote"], loading: true};
    this.followUp = this.followUp.bind(this);
  }

  componentDidMount() {
    getQuotes({}, snapVal => {
      this.setState({quotes: snapVal, loading: false});
    });
  }

  followUp(action) {
    const { actions } = this.state;

    this.setState({
      actions: [...actions, action]
    })
  }

  render() {
    const { quotes, actions, loading } = this.state;
    return (
      <>
        {
          loading ? <h1>Loading...</h1> :
          actions.map((action, index) => createConversationScript(quotes, action, index, this.followUp))
        }
      </>
    );
  }
}

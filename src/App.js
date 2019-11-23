import React, { Component } from 'react';
import './App.css';
import { getQuotes } from './firebase_api/index';
import 'normalize.css/normalize.css';
import { createConversationScript } from './ConversationScript';

export default class App extends Component {
  constructor() {
    super();
    this.state = {quotes: [], actions: ["showQuote"]};
    this.followUp = this.followUp.bind(this);
  }

  componentDidMount() {
    getQuotes({}, snapVal => {
      this.setState({quotes: snapVal});
    });
  }

  followUp(action) {
    const { actions } = this.state;

    this.setState({
      actions: [...actions, action]
    })
  }

  render() {
    const { quotes, actions } = this.state;
    return (
      <>
        { actions.map((action, index) => createConversationScript(quotes, action, index, this.followUp)) }
      </>
    );
  }
}

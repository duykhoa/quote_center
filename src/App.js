import React, { Component } from 'react';
import './App.css';
import { getQuotes } from './firebase_api/index';
import 'normalize.css/normalize.css';
import _ from 'lodash';

export default class App extends Component {
  constructor() {
    super();
    this.state = { quotes: [], firstNotificationText: "", firstButtonEnabled: true, firstButtonClicked: false, firstReplyNotificationText: "", offset: 0, limit: 0, displayQuote1: null };
  }

  componentDidMount() {
    getQuotes({}, snapVal => {
      this.setState({ quotes: snapVal });
    });
  }

  render() {
    const { offset, limit, quotes, firstNotificationText, firstButtonEnabled, firstButtonClicked, firstReplyNotificationText, displayQuote1 } = this.state;
    let renderedQuotes = [];

    return (
      <>
        <div>
          <h1>There are many quotes, click until you find the one you like</h1>
          <div>
            <button
              disabled={!firstButtonEnabled}
              onClick={e => {
                const offset = _.random(0, quotes.length);

                this.setState({
                  firstNotificationText: "You actually click this f* button! Ok, here is a quote",
                  offset: offset, limit: 1,
                  firstButtonEnabled: false,
                  firstButtonClicked: true,
                });
              }}
            >click</button>
          </div>

          <h2>{firstNotificationText}</h2>
        </div>

        <div>
          { quotes.slice(offset, offset + limit).map(q => (<q key={q.body}>{q.body}</q>)) }

          {
            firstButtonClicked &&
            (<div>
              <p>Do you like it?</p>
              <button
                onClick={ e => {
                  this.setState({firstReplyNotificationText: "yeah, you like the quote! I will show more then"});
                }}
              >yes</button>

              <button
                onClick={ e => {
                  this.setState({firstReplyNotificationText: "Why don't you like it? It is Jim Rohn quotes you know?"});
                }}
              >no</button>
            </div>)
          }

          {
            firstReplyNotificationText && <p>{firstReplyNotificationText}</p>
          }
        </div>
      </>
    );
  }
}

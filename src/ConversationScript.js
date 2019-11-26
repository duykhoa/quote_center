import React, { Component, useState } from 'react';
import _ from 'lodash';
import ActionCaller from './ActionCaller';
import Feedback from './Feedback';

class ConversationScript extends Component {
  constructor() {
    super();
    this.state = {
      showQuoteButtonEnabled: true,
      displayFeedback: false,
      feedbackDisable: false
    }
  }

  componentDidMount() {
    const {quotes, withViewQuoteButtonText} = this.props;
    const index = _.random(0, quotes.length);
    const quote = quotes[index];

    if (!withViewQuoteButtonText) {
      const index = _.random(0, quotes.length);
      const quote = quotes[index];
      this.setState({ displayQuote: quote, displayFeedback: true });
    }
  }

  render() {
    const { quotes, title, withViewQuoteButtonText, followUp, followUpActions } = this.props;
    const { displayQuote, displayFeedback, showQuoteButtonEnabled, feedbackDisable } = this.state;
    let viewQuoteButton;

    if (withViewQuoteButtonText) {
      viewQuoteButton = (
        <button
          disabled={!showQuoteButtonEnabled}
          onClick={e => {
            const index = _.random(0, quotes.length);
            const quote = quotes[index];

            this.setState({
              displayQuote: quote,
              displayFeedback: true,
              showQuoteButtonEnabled: false
            });
          }}
        >{withViewQuoteButtonText}</button>);
    } else {
      viewQuoteButton = (<></>);
    }

    return (
      <>
        <h2>{title}</h2>

        <div>
          { viewQuoteButton }
        </div>

        { displayQuote && <p>{displayQuote.body}</p> }
        { displayFeedback && (
            <Feedback
              followUpActions={followUpActions}
              actionHandler={ action => {
                ActionCaller.call(action, followUp, displayQuote);
              }}
            ></Feedback>
        )}
      </>
    );
  }
}

export default ConversationScript ;

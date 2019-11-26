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
      feedbackDisable: false,
      displayQuotes: []
    }
  }

  componentDidMount() {
    const {quotes, withViewQuoteButtonText, quoteLimit} = this.props;

    if (!withViewQuoteButtonText) {
      const displayQuotes = _.sampleSize(quotes, quoteLimit);
      this.setState({ displayQuotes: displayQuotes, displayFeedback: true });
    }
  }

  render() {
    const { quoteAction, quotes, quoteLimit, title, withViewQuoteButtonText, followUp, followUpActions } = this.props;
    const { displayQuotes, displayFeedback, showQuoteButtonEnabled, feedbackDisable } = this.state;
    let viewQuoteButton;

    if (withViewQuoteButtonText) {
      viewQuoteButton = (
        <button
          disabled={!showQuoteButtonEnabled}
          onClick={e => {
            const displayQuotes = _.sampleSize(quotes, quoteLimit);

            this.setState({
              displayQuotes: displayQuotes,
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

        { !_.isEmpty(displayQuotes) && quoteAction === "displayQuote" && (
          displayQuotes.map((quote, index) => <p key={index}>{quote.body}</p>))
        }

        { displayFeedback && (
            <Feedback
              followUpActions={followUpActions}
              actionHandler={ action => {
                ActionCaller.call(action, followUp, displayQuotes);
              }}
            ></Feedback>
        )}
      </>
    );
  }
}

export default ConversationScript ;

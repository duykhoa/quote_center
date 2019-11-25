import React, { Component, useState } from 'react';
import _ from 'lodash';

const createConversationScript = (quotes, action, index, followUp) => {
  const actionTitles = {
    "showQuote": ["Click to see the quote"],
    "showQuoteDislikeFeedback": ["Oh! This one you may like"],
    "showQuoteLikeFeedback": ["You may also like this one"]
  }

  const title = actionTitles[action][0];

  // FIXME please -- no more if else
  const withViewQuoteButton = action === "showQuote";
  let followUpAction;

  // FIXME please -- no more if else
  if (action === "showQuoteLikeFeedback") {
    followUpAction = {
      more: () => followUp("showQuoteLikeFeedback"),
      less: () => followUp("showQuoteDislikeFeedback")
    }
  } else {
    followUpAction = {
      like: () => followUp("showQuoteLikeFeedback"),
      dislike: () => followUp("showQuoteDislikeFeedback")
    }
  }

  return (
    <ConversationScript
      action={action}
      key={index}
      title={title}
      quotes={quotes}
      withViewQuoteButton={withViewQuoteButton}
      followUp={followUpAction}
    ></ConversationScript>
  )
}

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
    const {quotes, withViewQuoteButton} = this.props;
    const index = _.random(0, quotes.length);
    const quote = quotes[index];

    if (!withViewQuoteButton) {
      const index = _.random(0, quotes.length);
      const quote = quotes[index];
      this.setState({ displayQuote: quote, displayFeedback: true });
    }
  }

  render() {
    const {quotes, title, withViewQuoteButton, followUp} = this.props;
    const {displayQuote, displayFeedback, showQuoteButtonEnabled, feedbackDisable} = this.state;
    let viewQuoteButton;

    const followUpElements = Object.entries(followUp).map(([action, actionFunction]) => {
      return (
        <>
          <button onClick={() => {
              this.setState({feedbackDisable: true});
              actionFunction();
            }}
            key={action}
            disabled={feedbackDisable}
          >{action}</button>
        </>
      )
    });

    if (withViewQuoteButton) {
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
        >Click</button>);
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
        { displayFeedback && followUpElements }
      </>
    );
  }
}

export { ConversationScript, createConversationScript };

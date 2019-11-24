import React, { Component, useState } from 'react';
import _ from 'lodash';

const createConversationScript = (quotes, action, index, followUp) => {
  const actionTitles = {
    "showQuote": "Click to see the quote",
    "showQuoteDislikeFeedback": "Oh! This one you may like",
    "showQuoteLikeFeedback": "You may also like this one"
  }

  const title = actionTitles[action];

  // only show view quote button for showQuotes action
  const withViewQuoteButton = action === "showQuote";

  return (
    <ConversationScript
      action={action}
      key={index}
      title={title}
      quotes={quotes}
      withViewQuoteButton={withViewQuoteButton}
      followUp={{
        like: () => followUp("showQuoteLikeFeedback"),
        dislike: () => followUp("showQuoteDislikeFeedback")
      }}
    ></ConversationScript>
  )
}

class ConversationScript extends Component {
  constructor() {
    super();
    this.state = {
      showQuoteButtonEnabled: true,
      displayFeedback: false
    }

    this.feedbackYes = this.feedbackYes.bind(this);
    this.feedbackNo = this.feedbackNo.bind(this);
  }

  feedbackYes() {
    this.props.followUp.like();
  }

  feedbackNo() {
    this.props.followUp.dislike();
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
    const {quotes, title, withViewQuoteButton} = this.props;
    const {displayQuote, displayFeedback, showQuoteButtonEnabled} = this.state;
    let viewQuoteButton;

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

        {
          displayQuote && <p>{displayQuote.body}</p>
        }

        {
          displayFeedback && (
            <Feedback
              feedbackYes={this.feedbackYes}
              feedbackNo={this.feedbackNo}
            ></Feedback>
          )
        }
      </>
    );
  }
}

const Feedback = (props) => {
  const [disable, setDisable] = useState(false);

  return (
    <>
      <h3>Do you like it?</h3>

      <button onClick={() => {
          setDisable(true);
          props.feedbackYes();
        }}
        disabled={disable}
      >yes</button>

      <button onClick={() => {
          setDisable(true);
          props.feedbackNo()
        }}
        disabled={disable}
      >no</button>
    </>
  )
}

export { ConversationScript, createConversationScript };

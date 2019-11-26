import React from 'react';
import { schema } from './DecisionTree';
import ConversationScript from './ConversationScript';

const createConversationScript = (quotes, action, index, followUp) => {
  let conversationScript = schema.find(node => node.name == action);

  const title = conversationScript.message;
  const quoteAction = conversationScript.action;

  let limit = 1;

  if (action === "show3Quotes") {
    limit = 3;
  }

  let viewQuoteButton;

  return (
    <ConversationScript
      key={index}
      action={action}
      quoteAction={quoteAction}
      quoteLimit={limit}
      title={title}
      quotes={quotes}
      withViewQuoteButtonText={conversationScript.viewQuoteButtonText}
      followUpActions={ conversationScript.followUp }
      followUp={ followUp }
    ></ConversationScript>
  )
}

export default createConversationScript;

import React from 'react';
import { schema } from './DecisionTree';
import ConversationScript from './ConversationScript';

const createConversationScript = (quotes, action, index, followUp) => {
  let conversationScript = schema.find(node => node.name == action);

  const title = conversationScript.message;

  let viewQuoteButton;

  return (
    <ConversationScript
      key={index}
      action={action}
      title={title}
      quotes={quotes}
      withViewQuoteButtonText={conversationScript.viewQuoteButtonText}
      followUpActions={ conversationScript.followUp }
      followUp={ followUp }
    ></ConversationScript>
  )
}

export default createConversationScript;

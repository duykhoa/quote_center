const schema = [
  {
    name: "showQuote",
    description: "Show a quote",
    message: "Click to see the quote",
    action: "displayQuote",
    viewQuoteButtonText: "click",
    followUp: {
      type: "yesno",
      options: [
        {
          label: "like",
          action: "showQuoteLikeFeedback"
        },
        {
          label: "dislike",
          action: "showQuoteDislikeFeedback"
        }
      ]
    }
  },
  {
    name: "showQuoteDislikeFeedback",
    description: "Show a quote after dislike feedback",
    message: "Oh! This one you may like",
    action: "displayQuote",
    followUp: {
      type: "radio",
      options: [
        {
          label: "1",
          action: "debugQuote"
        }
      ]
    }
  },
  {
    name: "showQuoteLikeFeedback",
    description: "Show similar quote after like feedback",
    message: "This one you may also like",
    action: "displayQuote",
    followUp: {
      type: "radio",
      options: [
        {
          label: "like is the only choice haha",
          action: "showQuoteLikeFeedback"
        }
      ]
    }
  },
];

export { schema };

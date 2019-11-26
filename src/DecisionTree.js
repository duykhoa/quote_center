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
    message: "Too bad, you don't like it",
    action: "Noop",
    followUp: {
      type: "button",
      options: [
        {
          label: "Terminate me",
          action: "endOfProgram"
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
          label: "see my next quote",
          action: "showQuoteLikeFeedback"
        },
        {
          label: "see more quotes",
          action: "show3Quotes"
        }
      ]
    }
  },
  {
    name: "show3Quotes",
    description: "Show 3 quotes",
    message: "Few more quotes for the day",
    action: "displayQuote",
    followUp: {
      type: "button",
      options: [
        {
          label: "That's it! Bye!",
          action: "endOfProgram"
        },
      ]
    }
  },
];

export { schema };

class ActionCaller {
  static call(action, followUp, displayQuote) {
    const actionCallers = {
      "debugQuote": () => { console.log("This is a debug action caller. End of program") },
      "showQuoteDislikeFeedback": () => { followUp(action) },
      "showQuoteLikeFeedback": () => { followUp(action) },
    };

    actionCallers[action]()
  }
}

export default ActionCaller;

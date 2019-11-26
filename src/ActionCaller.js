class ActionCaller {
  static call(action, followUp, displayQuotes) {
    const actionCallers = {
      "endOfProgram": ActionCaller.endOfProgram,
      "showQuoteDislikeFeedback": () => { followUp(action) },
      "showQuoteLikeFeedback": () => { followUp(action) },
      "show3Quotes": () => { followUp(action) }
    };

    actionCallers[action]();
  }

  static endOfProgram(action) {
    alert("End of the program! Thanks for visiting my website");
  }
}

export default ActionCaller;

import React, { useState } from 'react';

const Feedback = (props) => {
  const [disabled, setDisabled] = useState(false)
  const { followUpActions, actionHandler } = props;

  return followUpActions.options.map(opt => {
    return (
      <button
        key={ opt.label }
        disabled={ disabled }
        onClick={ e => {
          console.log("handle in the followUp action");
          setDisabled(true);
          actionHandler(opt.action);
        }}
      >{ opt.label }</button>
    );
  });
}

export default Feedback;

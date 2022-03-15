import React from 'react';
import '../styles/ComboMoveCard.css';

// key={step.id} name={step.name} image={step.image} input={step.input} stepNumber={step.stepNumber}
function ComboMoveCard ({name, image, numPadNotation, input, stepNumber}) {
  return (
    <div className="combo-move-card  col-5 col-md-4 col-xl-3 my-2 d-flex justify-content-center">
      <div className="inside-card card align-items-center text-center">
        <h3 className="text-start">{stepNumber}</h3>
        <img className="card-image" src={image} alt="Card image cap"></img>
        <div className="text-holder">
          <p>{name}</p>
          <p>{numPadNotation}</p>
          {input && (
            <p>({input})</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComboMoveCard;
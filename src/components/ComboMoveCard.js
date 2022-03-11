import React from 'react';
import '../styles/ComboMoveCard.css';

// key={step.id} name={step.name} image={step.image} input={step.input} stepNumber={step.stepNumber}
function ComboMoveCard ({name, image, numPadNotation, input, stepNumber}) {
  return (
    <div className="combo-move-card card teal col-5 col-md-4 col-lg-3 d-flex align-items-center">
      <div className="inside-card">
        <h3>{stepNumber}</h3>
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
import React from 'react';

// key={step.id} name={step.name} image={step.image} input={step.input} stepNumber={step.stepNumber}
function ComboMoveCard ({name, image, input, stepNumber}) {
  return (
    <div className="combo-move-card card col-4 col-md-3 col-lg-2 m-2 d-flex align-items-center">
      <div className="inside-card">
        <h1>{stepNumber}</h1>
        <img className="card-img" src={image} alt="Card image cap"></img>
        <div className="text-holder">
          <p>{name}</p>
          {input && (
            <p>({input})</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComboMoveCard;
import React from 'react';

// props should give us the title, notation, and user for the combo
function ComboListCard (props) {
  return (
    <div className="combo-list-card card col-10 my-2"> 
      <h1>{props.combo.title}</h1>
      <h4>{props.combo.notation}</h4>
    </div>
  );
}

export default ComboListCard;
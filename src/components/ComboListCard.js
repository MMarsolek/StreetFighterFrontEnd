import React from 'react';
import { Link } from 'react-router-dom';

// props should give us the title, notation, and user for the combo
function ComboListCard (props) {
  return (
    // <Link to={`/combos/${props.combo.id}`}  className="combo-list-card card col-10 my-2"> 
    //   <h1>{props.combo.title}</h1>
    //   <h4>{props.combo.notation}</h4>
    // </Link>
    <div className="combo-list-card card col-10 my-2"> 
      <Link to={`/combos/${props.combo.id}`}><h1>{props.combo.title}</h1></Link>
      <h4>{props.combo.notation}</h4>
    </div>
  );
}

export default ComboListCard;
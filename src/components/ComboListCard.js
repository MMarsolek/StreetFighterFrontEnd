import React from 'react';
import { Link } from 'react-router-dom';
import backEndUrl from '../utils/urls';
import axios from 'axios';

// props should give us the title, notation, and user for the combo
function ComboListCard (props) {
  const deleteCombo = async () => {
    try {
      // TODO: implement logic to handle case where some smartass tries to go to a page for a character that doesn't exist
      // Making a request to our api for the character whose name is in the url of this page
      await axios.delete(`${backEndUrl}combos/${props.combo.id}`, { data: {token: window.localStorage.getItem("token")}});
      window.location.reload();
    } catch (err) {
      console.log("=====\n" + err + "\n=====");
      throw err;
    }
  }

  return (
    // <Link to={`/combos/${props.combo.id}`}  className="combo-list-card card col-10 my-2"> 
    //   <h1>{props.combo.title}</h1>
    //   <h4>{props.combo.notation}</h4>
    // </Link>
    <div className="combo-list-card card col-10 my-2"> 
      <Link to={`/combos/${props.combo.id}`}><h1>{props.combo.title}</h1></Link>
      <h4>{props.combo.notation}</h4>
      {/* TODO: male the a cursor a pointer on this fella*/}
      {props.userId === props.combo.UserId && <p onClick={deleteCombo}>🗑️</p>}
    </div>
  );
}

export default ComboListCard;
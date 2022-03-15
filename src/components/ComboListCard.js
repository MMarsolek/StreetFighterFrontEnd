import React from 'react';
import { Link } from 'react-router-dom';
import { backEndUrl, testUrl } from '../utils/urls';
import axios from 'axios';

// props should give us the title, notation, and user for the combo
function ComboListCard (props) {
  const deleteCombo = async () => {
    try {
      // TODO: implement logic to handle case where some smartass tries to go to a page for a character that doesn't exist
      // Making a request to our api for the character whose name is in the url of this page
      await axios.delete(`${backEndUrl}combos/${props.combo.id}`, { headers: {token: window.localStorage.getItem("token")}});
      // await axios.delete(`${testUrl}combos/${props.combo.id}`, { headers: {token: window.localStorage.getItem("token")}});

      window.location.reload();
    } catch (err) {
      console.log("=====\n" + err + "\n=====");
      throw err;
    }
  }

  return (
    <div className="combo-list-card card col-8 my-2"> 
      <Link to={`/combos/${props.combo.id}`}><h1>{props.combo.title}</h1></Link>
      {props.combo.Character && <h4>Character: {props.combo.Character.name}</h4>}
      {props.combo.User && <h4>Posted by: {props.combo.User.username}</h4>}
      <h4>{props.combo.notation}</h4>
      {/* TODO: male the a cursor a pointer on this fella*/}
      {console.log("userId prop is " + props.userId)}
      {console.log("combo's userId is " + props.combo.UserId)}
      {props.userId === props.combo.UserId && <p onClick={deleteCombo}>🗑️</p>}
    </div>
  );
}

export default ComboListCard;
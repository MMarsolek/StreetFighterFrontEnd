import React from 'react';
import ComboListCard from './ComboListCard.js';
import '../styles/ComboList.css';

// We should be passed all the combos we'll need to render to the page as ComboListCards as a prop called combos
function ComboList (props) {
  return (
    <div className="combo-list row justify-content-center my-4"> 
      {/* Only tries to map if the combos array exists */}
      <h1 className="text-center list-title">Posted combos:</h1>
      {props.combos?.map((combo, index) => {
        // Passing each ComboListCard the info it needs to render its thumbnail of sorts for a specific combo
        {console.log("In ComboList, userId is " + props.userId)}
        return(<ComboListCard key={index} combo={combo} userId={props.userId}/>)
      })}
      {props.combos?.length === 0 && !props.profile && (
        <h2 className="col-10 text-center my-2">No combos have yet been posted for this character</h2>
      )}
      {props.combos?.length === 0 && props.profile && (
        <h2 className="col-10 text-center my-2">You do not currently have any posted combos</h2>
      )}
    </div>
  );
}

export default ComboList;
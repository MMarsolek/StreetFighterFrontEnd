import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ComboMoveCard from '../components/ComboMoveCard.js';

function Combo() {
  // The combo that this page is about
  const [combo, setCombo] = useState({});
  useEffect(async () => {
    let response;
    // Getting the id that's in the url of this page
    const urlPath = window.location.pathname.split('/');
    const comboId = urlPath[urlPath.length - 1];
    try {
      response = await axios.get(`https://fierce-crag-37779.herokuapp.com/api/combos/${comboId}`);
      console.log(response.data);
      setCombo(response.data);
    } catch (err) {
      console.log("=====\n" + err + "\n=====");
      throw err;
    }
  }, []);

  return (
    <div className="combo-container container-fluid">
      <div className="row justify-content-center">
        <div className="title-holder col-12 my-5">
          <h1 className="text-center">{combo.title}</h1>
          <h3 className="text-center">{combo.notation}</h3>
        </div>
        {combo.ComboMoves?.map((step, index) => {
          // Note that step.moveId is equal to the id of the move in question
          return (<ComboMoveCard key={index} moveId={step.MoveId} name={step.Move.name} image={step.Move.image} numPadNotation={step.Move.numPadNotation} input={step.Move.input} stepNumber={step.stepNumber}/>)
        })}
        <div className="notes-holder col-12 my-5">
          <h3 className="text-center">Notes:</h3>
          <h4 className="text-center">{combo.notes}</h4>
        </div>
      </div>
    </div>
  );
}

export default Combo;

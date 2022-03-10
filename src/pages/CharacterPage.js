import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { validateNumPadNotation } from '../utils/helpers.js';
import ComboMoveCard from '../components/ComboMoveCard.js';

export default function CharacterPage() {
  // A state variable stores the info about the character for this page
  const [character, setCharacter] = useState({});
  // A state variable that tracks whether or not to render the text area for submitting a combo
  const [renderEntryField, setRenderEntryField] = useState(false);
  // A state variable that tracks the combo notation the user has entered in the text area on the page
  const [comboSubmission, setComboSubmission] = useState('');
  // A state variable that tracks the contents of the user-generated combo (it'll be an array of objects)
  const [renderedCombo, setRenderedCombo] = useState([]);
  // A state variable that tracks whether to render the combo visualize field
  const [renderOK, setRenderOK] = useState(false);
  // A state variable that tracks what, if anything, should be the content of the error message we'll render beneath the text area in case of an invalid combo submission
  const [errorMessage, setErrorMessage] = useState('');

  // We make a pull request on page load in order to get data about this character from our api
  useEffect(async () => {
    let response;
    // Getting the name that's in the url of this page
    const urlPath = window.location.pathname.split('/');
    const characterName = urlPath[urlPath.length - 1];
    try {
      // TODO: implement logic to handle case where some smartass tries to go to a page for a character that doesn't exist
      // Making a request to our api for the character whose name is in the url of this page
      response = await axios.get(`https://fierce-crag-37779.herokuapp.com/api/characters/${characterName}`);
      // TODO: remove these print statements when you're done with them
      console.log("data: ");
      console.log(response.data);
    } catch (err) {
      console.log("=====\n" + err + "\n=====");
      throw err;
    }
     
    // Setting our character state variable equal to the data we got back from our request to our api
    setCharacter(response.data);
  },[]);

  // Updates our comboSubmission
  const handleTextAreaChange = (event) => {
    setComboSubmission(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Provided the user has entered a combo that's written in correct notation and corresponds to moves that are actually in this character's moveset, we'll fill this array up with the data that we'll use to render a combo to the page (and later, to make a POST request to our database if the user chooses to save the combo)
    let comboToRender = [];
    // If the user hasn't entered anything, we render an error message
    if (!comboSubmission) {
      setErrorMessage("Please enter a combo!")
      return;
    }

    //Checking to see if the text that the user is attempting to submit is in valid numpad notation
    const submissionAttempt = validateNumPadNotation(comboSubmission);
    console.log(submissionAttempt);
    
    // If it's not in valid numpad notation, we'll render an error message that says as much
    if (!submissionAttempt) {
      setErrorMessage("The combo you entered was not written in valid numpad notation!")
      return;
    }

    // Now that we've verified that the user has entered correct notation, we have to make sure that each of the steps in the combo they entered corresponds to a move that this character possesses
    for (let i = 0; i < submissionAttempt.length; i++) {
      let inMoveset = false;
      const step = submissionAttempt[i].toUpperCase();
      console.log(`Checking for ${step} in ${character.name}'s moveset`);

      for (const move of character.Moves) {
        if (move.numPadNotation.toUpperCase() === step) {
          inMoveset = true;
          // Adding the information necessary to render this step to our comboToRender array
          comboToRender.push(
            {
              id: move.id,
              image: move.image,
              name: move.name,
              input: move.input,
              stepNumber: i + 1
            }
          );
          break;
        }
      }

      // If any of the steps of the combo the user entered do not correspond to a move in the character's moveset, we'll render an error message to the screen
      if (!inMoveset) {
        setErrorMessage(`The step "${step}" of the combo you entered did not correspond to any of the moves in ${character.name}'s moveset.`);
        return;
      }
    } 
    
    // Now that we've verified that the user's input is correct, we set renderedCombo equal to comboToRender
    setRenderedCombo(comboToRender);
    setRenderOK(true);
    // Then, we reset the error message to nothing, to ensure it's no longer rendered
    setErrorMessage('');
    // console.log("\nForm heckin' submitted\n");
  }

  // TODO: how are we gonna sanitize inputs?

  return (
    <div className="character-page container-fluid my-4">
      <div className="row justify-content-center">
        <div className="portrait-holder col-4 col-md-3 col-lg-2">
          {/* TODO: style this in CSS to make sure the image isn't constantly resizing in weird ways */}
          <img className="card-img-top" src={character.portrait} alt={`A portrait of ${character.name}`}></img>
        </div>
        <div className="description-holder col-10 col-md-7 col-lg-9">
          <h1 className="font-weight-bold">{character.name} - {character.moniker}</h1>
          <p>{character.description}</p>

          <div className="combo-entry-holder d-flex justify-content-center align-items-center">
            {!renderEntryField && (
              <button className="btn btn-secondary" onClick={() => setRenderEntryField(true)}>Translate a combo!</button>
            )}
            {/* Only render the combo entry field if renderEntryField is true */}
            {renderEntryField && (
              <form className="form" onSubmit={handleFormSubmit}>
                <h3>Enter the combo you wish to translate below: </h3>
                <textarea onChange={handleTextAreaChange} id="w3review" name="w3review" rows="3" cols="60" placeholder="Enter your combo here"></textarea>
                {/* The error message will only be rendered here if it exists */}
                {errorMessage && (<p className="error-text">{errorMessage}</p>)}
                <button className="btn btn-secondary" type="submit">Render combo</button>
                <button className="btn btn-secondary" type="button" onClick={() => setRenderEntryField(false)}>Cancel</button>
            </form>
            )}
          </div> 
        </div>
      </div>
      {renderOK && (
        <div className="combo-visualizer row justify-content-around">
          <h1 className="text-align-center">{comboSubmission}</h1>
          {
            renderedCombo.map(step => {
              return (<ComboMoveCard key={step.id} name={step.name} image={step.image} input={step.input} stepNumber={step.stepNumber}/>)
            })
          }
          <button className="btn btn-secondary" type="submit">Save combo</button>
          <button className="btn btn-secondary" type="button">Close</button>
        </div>
      )}

    </div>
  );
}

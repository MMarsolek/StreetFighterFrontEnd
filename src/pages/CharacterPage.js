import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import '../styles/CharacterPage.css'
import { validateNumPadNotation } from '../utils/helpers.js';
import ComboMoveCard from '../components/ComboMoveCard.js';
import ComboList from '../components/ComboList.js';

export default function CharacterPage() {
  // stores the info about the character for this page
  const [character, setCharacter] = useState({});
  // tracks whether or not to render the text area for submitting a combo
  const [renderEntryField, setRenderEntryField] = useState(false);
  // tracks the combo notation the user has entered in the text area on the page
  const [comboNotation, setcomboNotation] = useState('');
  // tracks the contents of the user-generated combo (it'll be an array of objects)
  const [renderedCombo, setRenderedCombo] = useState([]);
  // tracks whether to render the combo visualize field
  const [renderComboVisualize, setrenderComboVisualize] = useState(false);
  // tracks what, if anything, should be the content of the error message we'll render beneath the text area in case of an invalid combo submission
  const [errorMessage, setErrorMessage] = useState('');
  // tracks whether to display the input areas for posting a combo
  const [displaySubmissionForm, setDisplaySubmissionForm] = useState(false);
  // tracks the would-be title of a combo to be posted to the database
  const [comboTitle, setComboTitle] = useState('');
  // tracks the would-be notes about a combo to be posted to the database
  const [comboNotes, setComboNotes] = useState('');
  // tracks if a post request to put up a combo has just been made. If one has, it's set to true.
  // TODO: will this even work?
  const [posted, setPosted] = useState(false);

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
      console.log(response.data);
      console.log(response.data.Combos); 
      // TODO: why are the below causing a syntax error when put in?
      // const id = JSON.parse(window.localStorage.getItem('userInfo'))['user']['id'];
      // console.log(JSON.parse(window.localStorage.getItem('userInfo'))['user']['id']);
      setCharacter(response.data);
    } catch (err) {
      console.log("=====\n" + err + "\n=====");
      throw err;
    }
     
    // Setting our character state variable equal to the data we got back from our request to our api
  },[]);

  // Updates our comboNotation
  const handleChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    
    if (targetName === "notation-submission") {
      setcomboNotation(targetValue);
    } else if (targetName === "title-input") {
      setComboTitle(targetValue);
    } else {
      setComboNotes(targetValue);
    }
  }

  const handleNotationFormSubmit = (event) => {
    event.preventDefault();

    // Provided the user has entered a combo that's written in correct notation and corresponds to moves that are actually in this character's moveset, we'll fill this array up with the data that we'll use to render a combo to the page (and later, to make a POST request to our database if the user chooses to save the combo)
    let comboToRender = [];
    // If the user hasn't entered anything, we render an error message
    if (!comboNotation) {
      setErrorMessage("Please enter a combo!")
      return;
    }

    //Checking to see if the text that the user is attempting to submit is in valid numpad notation
    const submissionAttempt = validateNumPadNotation(comboNotation);
    
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
              moveId: move.id,
              image: move.image,
              name: move.name,
              numPadNotation: move.numPadNotation,
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
    setrenderComboVisualize(true);
    setRenderEntryField(false);
    // Then, we reset the error message to nothing, to ensure it's no longer rendered
    setErrorMessage('');
  }

  const handleSubmissionFormSubmit = async (event) => {
    // When the user hits "Submit" on a combo, we want to check to make sure the user has input a title.
    // If they haven't, we'll render an error message--otherwise, we'll put together the stuff we need to make a post request to add this combo to the database.
    event.preventDefault();
    console.log(`on call of handleSubmissionFormSubmit\ncomboTitle: ${comboTitle}\ncomboNotes: ${comboNotes}`);

    // Rendering error messages and not submitted a request if the user enters bad input
    if (!comboTitle) {
      setErrorMessage('A title is required!');
      return;
    } else if (comboTitle.length > 255) {
      setErrorMessage('A title can have at most 255 characters!');
      return;
    }

    if (comboNotes.length > 1000) {
      setErrorMessage('A note can have at most 1000 characters!');
      return;
    }

    const newCombo = {
      title: comboTitle,
      notation: comboNotation,
      notes: comboNotes,
      // TODO: add UserId (get from local storage)
      characterId: character.id,
      comboMoves: renderedCombo,
      token: window.localStorage.getItem("token")
    }

    console.log(newCombo.token);

    try {
      console.log("attempting to post to database")
      const response = await axios.post("https://fierce-crag-37779.herokuapp.com/api/combos", newCombo);
      // TODO: remove these print statements when you're done with them
      console.log("response on posting: ");
      console.log(response);
      console.log("re-hiding everything and resetting all but one state variable");
      window.location.reload();
    } catch (err) {
      console.log("=====\n" + err + "\n=====");
      setErrorMessage('Error 500: failed to post combo');
      throw err;
    }
  }

  const hideEntryField = () => {
    setRenderEntryField(false);
    setcomboNotation('');
    setErrorMessage('');
  }

  const hideComboVisualizer = () => {
    setRenderedCombo([]);
    setrenderComboVisualize(false);
    setRenderEntryField(true);
  }

  const hideSubmissionForm = () => {
    setComboTitle('');
    setComboNotes('');
    setErrorMessage('');
    setDisplaySubmissionForm(false);
  }

  // const renderComboList = () => {
  //   setCombos
  // }

  // TODO: how are we gonna sanitize inputs?

  return (
    <div className="character-page container-fluid my-4">
      <div className="row justify-content-center">
        <div className="portrait-holder col-4 col-md-3 col-lg-2">
          {/* TODO: style this in CSS to make sure the image isn't constantly resizing in weird ways */}
          <img className="card-img-top" src={character.portrait} alt={`A portrait of ${character.name}`}></img>
        </div>
        <div className="description-holder col-10 col-md-7 col-lg-9">
          <h1 className="font-weight-bold name-and-moniker">{character.name} - {character.moniker}</h1>
          <p>{character.description}</p>
        </div>
        <div className="combo-entry-holder col-10 d-flex justify-content-center align-items-center">
            {/* This button will only render if we aren't already rendering a combo (!renderComboVisualize) and if we aren't rendering the entry field for combo notation (!renderEntryField) */}
            {!renderEntryField && !renderComboVisualize && (
              <button className="btn" onClick={() => setRenderEntryField(true)}>Translate a combo!</button>
            )}
            {/* Only render the combo entry field if renderEntryField is true */}
            {renderEntryField && (
              <form className="form notation-form" name="notation-form" onSubmit={handleNotationFormSubmit}>
                <h3>Enter the combo you wish to translate below: </h3>
                <textarea onChange={handleChange} name="notation-submission" value={comboNotation} placeholder="Enter your combo here"></textarea>
                {errorMessage && (<p className="error-text">{errorMessage}</p>)}
                <div className="button-holder d-flex justify-content-center">
                  <button className="btn" type="submit">Render combo</button>
                  <button className="btn" type="button" onClick={hideEntryField}>Cancel</button>
                </div>
              </form>
            )}
        </div> 
      </div>
      {/* If renderComboVisualize is true, then we have the go-ahead to render a translated combo to the page */}
      {renderComboVisualize && (
        <div className="combo-visualizer row justify-content-center">
          <h3 className="col-12 text-center my-3">{comboNotation}</h3>
          {
            // Rendering cards that display each move in the combo stored in renderedCombo
            renderedCombo.map((step, index) => {
              // Note that step.moveId is equal to the id of the move in question
              return (<ComboMoveCard key={index} moveId={step.moveId} name={step.name} image={step.image} numPadNotation={step.numPadNotation} input={step.input} stepNumber={step.stepNumber}/>)
            })
          }
          {/* The below div only shows up if we've not opened up the field to post a combo (!displayComboPostingOK) */}
          {
            !displaySubmissionForm && (
              <div className="button-holder save-holder col-10 d-flex justify-content-center">
                <button className="btn" type="submit" onClick={() => setDisplaySubmissionForm(true)}>Post this combo</button>
                <button className="btn" type="button" onClick={hideComboVisualizer}>Close</button>
              </div>
            )
          }
          {/* The field to post a combo to the database */}
          {/* Only render the submission field if displaySubmissionForm is true */}
          {displaySubmissionForm && (
            <div className="submission-form-holder col-10 d-flex justify-content-center align-items-center">
              {/* When  */}
              <form className="form submission-form" name="submission-form" onSubmit={handleSubmissionFormSubmit}>
                <h4>Enter the title of this combo</h4>
                <input name="title-input" type="text" onChange={handleChange} value={comboTitle} placeholder="Enter title here (required)"/>
                <h4>Enter any notes you may have about this combo</h4>
                <textarea name="notes-input" onChange={handleChange} value={comboNotes} placeholder="Enter any notes you may have about this combo here (optional)"></textarea>
                {errorMessage && (<p className="error-text">{errorMessage}</p>)}
                <div className="button-holder d-flex justify-content-center">
                  <button className="btn" type="submit">Submit</button>
                  <button className="btn" type="button" onClick={hideSubmissionForm}>Cancel</button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}
      {!renderComboVisualize && <ComboList combos={character.Combos}/>}
    </div>
  );
}

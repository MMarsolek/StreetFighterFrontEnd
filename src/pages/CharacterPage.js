import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

export default function CharacterPage() {
  // A state variable that we'll use to store the info about the character for this page
  const [character, setCharacter] = useState({});
  // A state variable that we'll use to track whether or not to render the text area for submitting a combo
  const [renderEntryField, setRenderEntryField] = useState(false);

  // Making a pull request on page load in order to get data about this character from our api
  useEffect(async () => {
    let response;
    // Getting the name that's in the url of this page
    const urlPath = window.location.pathname.split('/');
    const characterName = urlPath[urlPath.length - 1];
    try {
      // TODO: implement logic to handle case where some smartass tries to go to a page for a character that doesn't exist
      // Making a request to our api for the character whose name is in the url of this page
      response = await axios.get(`https://fierce-crag-37779.herokuapp.com/api/characters/${characterName}`);
      console.log("data: ");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
    //Setting the data for this character equal to the data we got back from our request to our api
    setCharacter(response.data);
    setRenderEntryField(false);
  },[]);

  //A function to render the combo entry field 

  // TODO: how are we gonna sanitize inputs?
  return (
    <div className="character-page container-fluid my-4">
      <div className="row justify-content-center">
        <div className="portrait-holder col-4 col-md-3 col-lg-2">
          {/* TODO: style this in CSS to make sure the image isn't constantly resizing in weird ways */}
          <img className="card-img-top" src={character.portrait}></img>
        </div>
        <div className="description-holder col-10 col-md-7 col-lg-9">
          <h1 className="font-weight-bold">{character.name} - {character.moniker}</h1>
          <p>{character.description}</p>

          <div className="combo-entry-holder d-flex justify-content-center align-items-center">
            {!renderEntryField && (
              <button className="btn btn-secondary" onClick={() => setRenderEntryField(true)}>Translate a combo!</button>
            )}
            {renderEntryField && (
              <form className="form">
                <h3>Enter the combo you wish to translate below: </h3>
                <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="Enter your combo here">
                </textarea>
                {/* {errorMessage && (
                      <p className="error-text">{errorMessage}</p>
                )} */}
                <button className="btn btn-secondary">Render combo</button>
                <button className="btn btn-secondary" onClick={() => setRenderEntryField(false)}>Cancel</button>
            </form>
            )}
          </div> 
        </div>
      </div>
      

    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import CharacterCard from '../components/CharacterCard.js';
import { propTypes } from "react-bootstrap/esm/Image";



export default function  Characters() {
  //Make axios request to get data from backend
  //For each character, return image card.
  const [characters, setCharacter] = useState([]);

  //On page load, we fetch all the characters from our api and store them in our characters array
  useEffect(async () => {
    let response;
    try {
      response = await axios.get('https://fierce-crag-37779.herokuapp.com/api/characters');
    } catch (err) {
      console.log(err);
      throw err;
    }
    setCharacter(response.data);
  },[]);

  return (
    <div className="container character-select-container my-4">
      <div className="row justify-content-center">
        {
          characters.map((character, index)=>{
            return(
              <div key={index} className="card col-5 col-md-3 col-lg-2 col-xl-1.5">
                <CharacterCard name={character.name} portrait={character.portrait}/>
              </div>
            ); 
          })
        }
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import CharacterCard from '../components/CharacterCard.js';
import LoadingScreen from "../components/Loading.js";



export default function  Characters() {
  //Make axios request to get data from backend
  //For each character, return image card.
  const [characters, setCharacter] = useState([{}]);
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
      let response;
      try{
          response = await axios.get('https://fierce-crag-37779.herokuapp.com/api/characters');
          if (loading){
              setLoading(false)
          }
      }catch(err){
          console.log(err);
          throw err;
      }
      setCharacter(response.data);
  },[]);
    if(loading){
      return <LoadingScreen/>
    }
  return (
    <div className="container character-select-container">
      <div className="row my-4 justify-content-center">
        {
          characters.map((character, index)=>{
            return(
              <div key={index} className="card col-2 mx-2">
                <CharacterCard name={character.name} portrait={character.portrait}/>
              </div>
            ); 
          })
        }
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from 'axios'
import CharacterCard from '../components/CharacterCard.js';
import LoadingScreen from "../components/Loading.js";
import '../styles/style.css'



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
    <div className="container character-select-container my-4">
      <div className="row justify-content-center">
        {
          characters.map((character, index)=>{
            return(
              <div key={index} className="col-5 col-md-3 col-lg-2 col-xl-1.5">
                <CharacterCard name={character.name} portrait={character.portrait}/>
  
              </div>
            ); 
          })
        }
      </div>
    </div>
  );
}

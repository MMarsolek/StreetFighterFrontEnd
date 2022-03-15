import React, { useState, useEffect } from "react";
import axios from 'axios'
import CharacterCard from '../components/CharacterCard.js';
import LoadingScreen from "../components/Loading.js";
import '../styles/style.css';
import useMediaQuery from '../utils/screensize';
import { backEndUrl, testUrl } from '../utils/urls';




export default function  Characters() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1025px)');
  const myStyles={
    padding: isMobile ? '1rem': isTablet ? '2rem':'2rem',
    paddingTop: isMobile ? '2rem': isTablet ? '4rem':'5rem',
    fontFamily: "'Permanent Marker', cursive",
    textShadow:  '0 0 3px orange,  2px 2px 5px red',
  }
  //Make axios request to get data from backend
  //For each character, return image card.
  const [characters, setCharacter] = useState([{}]);
  const [loading, setLoading] = useState(false)
  useEffect(async () => {
      let response;
      try{
        response = await axios.get(`${backEndUrl}characters`);
        // response = await axios.get(`${testUrl}characters`);
        if (!loading){
            setLoading(true)
        }
      }catch(err){
          console.log(err);
          throw err;
      }
      setCharacter(response.data);
  },[]);
    if(!loading){
      return <LoadingScreen/>
    }
  return (
    <div className="container character-select-container my-4">
      <h1 className="char-name"  style={myStyles}>Choose your fighter</h1>
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

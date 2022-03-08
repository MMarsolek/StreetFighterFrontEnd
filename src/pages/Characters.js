import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom';



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
      return (
        <div className="container character-select-container">
          <div className="row my-4 justify-content-center">
            <img width={250}src="https://i.pinimg.com/originals/ee/78/4f/ee784f0d96fa6c0fc6ee6c54c8eba3df.gif"></img>
          </div>
        </div>
      )
    }
  return (
    <div className="container character-select-container">
      <div className="row my-4 justify-content-center">
        {
          characters.map((character, index)=>{
            return(
              <div key={index} className="card col-2 mx-2">
                <Link to={`/characters/${character.name}`} className="btn">
                  <img className="card-img-top" src={character.portrait} alt="Card image cap"></img>
                  <div className="card-body">
                    <h2 className="font-weight-bold">{character.name}</h2>
                  </div>
                </Link>
              </div>
            ); 
          })
        }
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { Link, Route, Routes } from 'react-router-dom'
import CharacterPage from "./CharacterPage";


export default function  Characters() {
    //Make axios request to get data from backend
    //For each character, return image card.
    const [characters, setCharacter] = useState([{}]);
    const [loading, setLoading] = useState(true)
    useEffect(async () => {
        let response;
        try{
            response = await axios.get('https://fierce-crag-37779.herokuapp.com/api/characters');
            if (loading === true){
                setTimeout(()=>setLoading(false), 1500
                )}
        }catch(err){
            console.log(err);
            throw err;
        }
        setCharacter(response.data);
    },[]);
     return (
        <>        
            {
                characters.map((character, index)=>{
                return(
                    <div key={index} className="card">
                        <Link to={`/characters/${character.name}`} className="btn">
                        <img className="card-img-top" src={character.portrait} alt="Card image cap"></img>
                        <div className="card-body">
                            <Routes>
                                <Route path={`/characters/${character.name}`} render={(character) => <CharacterPage  />} />
                            </Routes>
                            {character.name}
                            </div>
                            </Link>
                        </div>
                    ) 
                })
            }
            </>
        );
}


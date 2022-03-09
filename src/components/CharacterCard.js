import React from 'react';
import { Link } from 'react-router-dom';

export default function CharacterCard({name, portrait}) {
  return (
    <Link to={`/characters/${name}`} className="char-card bg-image hover-zoom  hover-overlay">
      <img className="card-img" src={portrait} alt="Card image cap"></img>
      <p className="char-name ">{name}</p>
    </Link>
  );
}

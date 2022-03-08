import React from 'react';
import { Link } from 'react-router-dom';

export default function CharacterCard({name, portrait}) {
  return (
    <Link to={`/characters/${name}`} className="btn">
      <img className="card-img-top" src={portrait} alt="Card image cap"></img>
      <div className="card-body">
        <h2 className="font-weight-bold">{name}</h2>
      </div>
    </Link>
  );
}


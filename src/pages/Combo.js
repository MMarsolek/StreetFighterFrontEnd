import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ComboMoveCard from '../components/ComboMoveCard.js';

function Combo() {
  const [combo, setCombo] = useState({});

  useEffect(async () => {
    let response;
    // Getting the id that's in the url of this page
    const urlPath = window.location.pathname.split('/');
    const comboId = urlPath[urlPath.length - 1];
    try {
      response = await axios.get(`https://fierce-crag-37779.herokuapp.com/api/combos/${comboId}`);
      console.log(response.data);
      setCombo(response.data);
    } catch (err) {
      console.log("=====\n" + err + "\n=====");
      throw err;
    }
  }, []);

  return (
    <div>
      <h1>{combo.title}</h1>
      <h3>{combo.notation}</h3>
    </div>
  );
}

export default Combo;

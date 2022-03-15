import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { backEndUrl, testUrl } from '../utils/urls';
import ComboList from '../components/ComboList.js';

export default function Profile() {
    // The user whose profile we're looking at
    const [user, setUser] = useState({});
    
    useEffect(async () => {
      try {
        // response = await axios.get(`${backEndUrl}characters/${characterName}`);
        console.log("Making axios request");
        const response = await axios.get(`${backEndUrl}users/profile/${JSON.parse(window.localStorage.getItem('userInfo')).user.userName}`,  { headers: {token: window.localStorage.getItem("token")}});
        // const response = await axios.get(`${testUrl}users/profile/${JSON.parse(window.localStorage.getItem('userInfo')).user.userName}`,  { headers: {token: window.localStorage.getItem("token")}});
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.log("=====\n" + err + "\n=====");
        throw err;
      }
    }, []);


  return (
    <div className="container-fluid" style={{paddingTop: '5rem'}}>
        <h1 className="text-center" style={{fontFamily: 'Permanent Marker'}}>Welcome, {user.username}!</h1>
        <ComboList combos={user.Combos} userId={user.id} profile={true}/>
    </div>
  );
}
{/* <ComboList combos={character.Combos} userId={JSON.parse(window.localStorage.getItem('userInfo'))?.user.id}/> */}

import React from 'react';
import background from '../styles/images/ko.png'
const myStyle={
  background: `url(${background})`,
  height:'100vh',
  width:'100vw',
  fontSize:'50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: '-1',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
};

const PageNotFound= () =>{
    <div style={myStyle}>
        <h1>404 Error</h1>
        <h1>Page Not Found</h1>
    </div>
}
  
export default PageNotFound;
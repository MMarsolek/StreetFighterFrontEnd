import React from 'react';
const myStyle={
  fontSize:'50px',
  fontFamily: 'Permanent Marker',
  marginTop: '150px'
};

function PageNotFound() {
  console.log("rendering 404 page");
  return (
    <div style={myStyle} className="d-flex justify-content-center">
      <h1>404 Error - page not found</h1>
    </div>
  );
}
  
export default PageNotFound;
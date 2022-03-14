import React,  { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../styles/images/background.jpg'
import useMediaQuery from '../utils/screensize'
import {
  Grid,
  Box,
  FormControl,
  TextField,
} from '@material-ui/core';

const Login = ({ user }) => {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1025px)');

  const navigation = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;
    try{
      const response = await axios.post(`https://fierce-crag-37779.herokuapp.com/api/users/login`, {username, password });
      console.log('Log in attempted')
      window.localStorage.setItem('token', response.data.token);
      window.localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      navigation('/profile');
    }catch(error){
      console.log(error)
      return;
    }
  };

  useEffect(() => {
    if (user && user.id) navigation('/home');
  }, [user, navigation]);
  const myStyle={
    background: `url(${background})`,
    height:'100vh',
    width:'100vw',
    backgroundPosition: isMobile ? '25%' : '',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: '-1',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  };

const boxStyle={
  width: isMobile ? '15rem':'20rem',
  height: isMobile ? '15rem' : '20rem',
  marginRight: isMobile ? '': isTablet ? '' : '-52%',
  alignContent: 'center',
  border: 'darkgrey solid 1px',
  background: isMobile ? '#c5c2bec5' : 'rgba(236, 236, 236, 0.637)',
};
const gridStyle = {
  padding: isMobile ? '0 2rem' : "0 1rem",
  paddingTop: isMobile? '0':'1rem',
}

  return (
    <>
    <Grid container className='user-container' style={myStyle}>
      <Box  style={boxStyle}>
      <form onSubmit={handleLogin}>
        <Grid style={gridStyle}>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Grid container item className='button-container'>
                <button className='button' type="submit" style={{padding: '.5rem 4rem'}}>
                  Login
                </button>
                <Link className='button' href="/register" to="/register" style={{paddingTop: isMobile ? '0' : '1rem', fontSize : '.80rem'}}>
                  Join the Fight
                </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
    </>
  );
};

export default Login;

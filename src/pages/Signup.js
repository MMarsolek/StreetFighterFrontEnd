import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import background from '../styles/images/background.jpg';
import useMediaQuery from '../utils/screensize';
import { backEndUrl, testUrl } from '../utils/urls';

import {
  Grid,
  Box,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';

const Signup = ({ user }) => {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1025px)');
  const history = useNavigate();
  const navigation = useNavigate();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    setFormErrorMessage({ confirmPassword: ' ' });
    const form = event.currentTarget;
    const formElements = form.elements;
    const email = formElements.email.value;
    const username = formElements.username.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    console.log(username, email, password)
    try{
     const response = await axios.post(`${backEndUrl}users/`, {email, username, password });
    //  const response = await axios.post(`${testUrl}users/`, {email, username, password });
     console.log(response.data);
     window.localStorage.setItem('token', response.data.token)
     window.localStorage.setItem('userInfo', JSON.stringify(response.data.userObj))
     navigation('/profile');
    }catch(error){
      console.log(error)
      toast.error('Unable to create a new account', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }
  };
  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

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
};

const gridStyle = {
  padding: isMobile ? '0 4rem' : "0 2rem",
  paddingTop: isMobile? '1rem':'1rem',
}
const boxStyle={
  width: '20rem',
  height: isMobile ? '25rem' : '28rem',
  marginRight: isMobile ? '': isTablet ? '' : '-52%',
  alignContent: 'center',
  border: 'darkgrey solid 1px',
  background: isMobile ? '#c5c2bec5' : 'rgba(236, 236, 236, 0.637)',
};

  return (
    <>
    <Grid container className='user-container' style={myStyle}>
      <Box  style={boxStyle}> 
      <form onSubmit={handleRegister}>
          <Grid style={gridStyle}>
            <Grid>
              <FormControl>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  inputProps={{ minLength: 6 }}
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid >
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid container item className='button-container'style={{padding : '0 1rem'}}>
                <button className='button' type="submit">
                  Join the fight
                </button>
                <Link className='button' href="/login" to="/login"style={{paddingTop: isMobile ? '0' : '1rem', fontSize : '.80rem'}}>
                  Back to Login
                </Link>


            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
      </>
  );
};

export default Signup;

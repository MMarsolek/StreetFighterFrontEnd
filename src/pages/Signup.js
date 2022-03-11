import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../styles/images/background.jpg'

import {
  Grid,
  Box,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';

const Signup = ({ user }) => {
  const history = useNavigate();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    try{
      await axios.post(`https://fierce-crag-37779.herokuapp.com/api/users/`, {email, password });
    }catch(error){
      console.log(error.response.data.message)
    }
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  const myStyle={
    backgroundImage: `url(${background})`,
    height:'90vh',
    width:'100vw',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
const boxStyle={
  width: '20rem',
  height: '20rem'
};

  return (
    <>
    <Grid container className='user-container' style={myStyle}>
      <Box  style={boxStyle}> 
        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl  margin="normal" required>
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
            <Grid>
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
            <Grid container item className='button-container'>
              <button className='button' type="submit">
                Sign Up
              </button>
              <Link className='button' href="/login" to="/login">
                Login
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

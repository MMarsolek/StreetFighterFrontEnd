import React,  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../styles/images/background.jpg'
import {
  Grid,
  Box,
  FormControl,
  TextField,
} from '@material-ui/core';

const Login = ({ user }) => {
  const history = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const email = formElements.email.value;
    const password = formElements.password.value;
    try{
      await axios.post(`https://fierce-crag-37779.herokuapp.com/api/users/login`, {email, password });
      <Link src="/register" to="/register"></Link>
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
  height: '15rem'
};
  return (
    <>
    <Grid container className='user-container' style={myStyle}>
      <Box  style={boxStyle}>
        <form onSubmit={handleLogin}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="email"
                  label="Email"
                  name="email"
                  type="email"
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
                <button className='button' type="submit">
                  Login
                </button>
                <Link className='button' href="/register" to="/register">
                  Register
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

import React,  {  useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import axios from 'axios';
import background from '../styles/images/background.jpg'
import {
  Grid,
  Box,
  FormControl,
  TextField,
} from '@material-ui/core';

const Login = ({ user }) => {
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;
    try{
      const response = await axios.post(`http://localhost:3001/api/users/login`, {username, password });
      window.localStorage.setItem('token', JSON.stringify(response.data.token));
      window.localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      navigate('/profile');
    }catch(error){
      console.log(error.response.status)
    }
  };

  useEffect(() => {
    if (user && user.id) navigate.push('/home');
  }, [user, navigate]);
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
                <button className='button' type="submit">
                  Login
                </button>
                <Link className='button' href="/register" to="/register">
                  Create a new account
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

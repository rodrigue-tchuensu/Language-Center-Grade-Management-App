import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Error, LockOutlined} from '@material-ui/icons';
import {TextField, Button, CssBaseline, Typography} from '@material-ui/core';
import {Box, Grid, Paper, Avatar} from '@material-ui/core';

//image source: https://images.app.goo.gl/GVfAtDhD2wsu6opD7
import backgroundImage from './../../assets/foreign_language_books.jpg'
const request = require ('../../resources/request');


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(3, 0, 2, 5)
  },
  errorMessage: {
      marginLeft: theme.spacing(1.5),
      textAlign: 'center',
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")


  const redirect = () => {
    const userDetail = request.auth.getAvailableUserDetails()

    if(userDetail.roles.indexOf("ROLE_STAFF_ADMIN") > -1 || userDetail.roles.indexOf("ROLE_STAFF_MANAGER") > -1 || userDetail.roles.indexOf("ROLE_STAFF_TEACHER") > -1 ) {
      
      props.history.push('/staffs/accounts/view')
      
    } else if(userDetail.roles.indexOf("ROLE_STUDENT") > -1){
      
      props.history.push(`/students/${userDetail.username.replace('.', '-')}/report-card`)

    }
  }


  const handleOnSignInButtonClick = (event) => {

    const credential = {
      username: username || undefined,
      password: password || undefined
    }

    request.login(credential, (err, res) => {
      if(err) {
        setError(true)
      } else {
        request.auth.authenticate(res.header.authorization.split(' ')[1])
        redirect()
      }
    })
    event.preventDefault()
  }

  
  const handleOnUsernameTextfieldChange = (event) => {
    setUserName(event.target.value)
  }

  const handleOnPasswordTextfieldChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleOnSignInButtonClick} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={handleOnUsernameTextfieldChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleOnPasswordTextfieldChange}
              value={password}
             // autoComplete="current-password"
            />
            {error && (<Box className={classes.error}>
              <Error color='error'/>
              <Typography className={classes.errorMessage} color='error'><> Login failed.<br/> Your password or username is incorrect</> </Typography>
            </Box>)}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


// This form is derived from the material ui templates examples
// src: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in-side/SignInSide.js
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")


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
        console.log(err)
      } else {
        console.log(res)
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
            <LockOutlinedIcon />
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
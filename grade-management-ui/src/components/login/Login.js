import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false)

  const handleOnSignInButtonClick = () => {

    const credential = {
      username: username || undefined,
      password: password || undefined
    }

    request.login(credential, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)

        request.auth.authenticate(res.header.authorization.split(' ')[1], () => {
          setIsLoginSuccessful(true)
        })
      }
    })
  }

  const updateComponent = () => {
    const userDetail = request.auth.getAvailableUserDetails()

    if(userDetail.roles.indexOf("ROLE_STAFF_ADMIN") > -1 || userDetail.roles.indexOf("ROLE_STAFF_MANAGER") > -1 || userDetail.roles.indexOf("ROLE_STAFF_TEACHER") > -1 ) {
      
      props.history.push('/staffs/accounts/view')
      
    } else if(userDetail.roles.indexOf("ROLE_STUDENT") > -1){
      
      props.history.push('/students')

    }
  }

  const handleOnUsernameTextfieldChange = (event) => {
    setUserName(event.target.value)
  }

  const handleOnPasswordTextfieldChange = (event) => {
    setPassword(event.target.value)
  }
  
  useEffect(() => {
    if(isLoginSuccessful) {
      updateComponent()
    }
  })

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
              onClick={handleOnSignInButtonClick}
            >
              Sign In
            </Button>
        </div>
      </Grid>
    </Grid>
  );
}
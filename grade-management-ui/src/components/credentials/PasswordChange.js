import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button,  CssBaseline, Typography, Box} from '@material-ui/core';
import {Error} from '@material-ui/icons';
const request = require ('../../resources/request');

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 0, 2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
      marginLeft: theme.spacing(1.5)
  },
}));


export default function ChangeAccountPassword(props) {
  const classes = useStyles();
  const [error, setError] = useState(false)
  const [errorMessage, seterrorMessage] = useState("")
  const [formState, setFormState] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
  })

  const handleOnSubmitClick = (event) => { 
      if(!validateConfirmPasswordMatchesNewPassword(formState.newPassword, formState.confirmPassword)) {
          setError(true)
          seterrorMessage('Confirm-password does not matches new-password')
          event.preventDefault()
        return
      }

      const passwordUpdateDataDto = {
          username:         request.auth.getAvailableUserDetails().username || undefined,
          currentPassword:  formState.currentPassword   || undefined,
          newPassword:      formState.newPassword       || undefined,
      }

      request.post('credentials', passwordUpdateDataDto, (err, res) => {
          if(err) {
              setError(true)
              seterrorMessage(err.response.body.message)
              console.log(err.response.body.message)
          } else {
              console.log(res)
          }
      })

      event.preventDefault()
  }

  const handleOnTextFieldChange = (event) => {
      setFormState({ ...formState, [event.target.name]: event.target.value})
      setError(false)
  }

  const validateConfirmPasswordMatchesNewPassword = (newPassword, confirmPassword) => {
      return newPassword && newPassword !== 'null' && newPassword !== 'undefined' &&
             confirmPassword && confirmPassword !== 'null' && confirmPassword !== 'undefined' &&
             newPassword === confirmPassword
  }

  return(
    <Container component='main' >
      <CssBaseline/>
      <div className={classes.paper}>
          <Typography variant="h3" color="primary"> Change Your Password </Typography>
          <br/>
        <Container maxWidth='sm'>
        <form className={classes.form} onSubmit={handleOnSubmitClick}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Current Password"
            type="password"
            id="currentPassword"
            onChange={handleOnTextFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            onChange={handleOnTextFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={handleOnTextFieldChange}
          />
          {error && (<Box className={classes.error}>
            <Error color='error'/>
            <Typography className={classes.errorMessage} color='error'>{errorMessage}</Typography>
          </Box>)}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Password
          </Button>
        </form>
        </Container>
      </div>
    </Container>
  );
}

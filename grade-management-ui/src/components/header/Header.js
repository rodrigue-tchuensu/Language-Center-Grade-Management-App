import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton,} from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';

const request = require ('../../resources/request');

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Header(props) {
    const classes = useStyles();
    let history = useHistory()

    const handleOnSignOutButtonClick = () => {
        request.auth.logout(() => history.push('/'))
    }

    return(
        <div>
            <AppBar position="fixed" className={props.className}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        LLCE
                    </Typography>
                    <Button color="inherit" 
                        onClick={handleOnSignOutButtonClick}
                    >
                        Sign out
                    </Button>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
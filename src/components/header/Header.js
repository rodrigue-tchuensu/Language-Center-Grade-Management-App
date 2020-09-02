import React,  { useState, }  from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, } from '@material-ui/core';
import {Menu, MenuItem} from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';

const request = require ('../../resources/request');

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
      textTransform: 'none',
  }
}));

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

function EnhancedUserMenu(props) {

    let history = useHistory()
    const handleClose = () => {
       props.handleOnUserMenuClose();
    };


    const redirect = () => {
        const userDetail = request.auth.getAvailableUserDetails()
    
        if(userDetail.roles.indexOf("ROLE_STAFF_ADMIN") > -1 || userDetail.roles.indexOf("ROLE_STAFF_MANAGER") > -1 || userDetail.roles.indexOf("ROLE_STAFF_TEACHER") > -1 ) {
          
          history.push(`/staffs/${userDetail.username.replace('.', '-')}/password-change`)
          
        } else if(userDetail.roles.indexOf("ROLE_STUDENT") > -1){
          
          history.push(`/students/${userDetail.username.replace('.', '-')}/password-change`)
    
        }
      }

    const handleOnPasswordChangeClick = () => {
        redirect()
        props.handleOnUserMenuClose();
    }

    const handleOnSignOutClick = () => {
        request.auth.logout(() => history.push('/'))
    }

    return (
        <div>
        
        <StyledMenu
            id="user-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={handleClose}
        >
            <MenuItem key="changePassword" onClick={handleOnPasswordChangeClick}>Change Password</MenuItem>
            <MenuItem key="signOut" onClick={handleOnSignOutClick}>Sign Out</MenuItem>
        </StyledMenu>
        </div>
    );
}

export default function Header(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleOnUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleOnUserMenuClose = () => {
        setAnchorEl(null);
    }

    const formatUserName = (name) => {
        
        const pos = name.indexOf('.');
        let firstname = name.slice(0, pos);
        firstname = firstname[0].toUpperCase() + (firstname.slice(1)).toLowerCase();

        let lastname = name.slice(pos + 1);
        lastname = lastname[0].toUpperCase() + (lastname.slice(1)).toLowerCase();
        return firstname + "  " + lastname;
    }

    const userDetail = request.auth.getAvailableUserDetails()
    const username = formatUserName(userDetail.username)
    return(
        <AppBar position="fixed" className={props.className}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    LLCE
                </Typography>
               
                <Button
                    className={classes.button}
                    aria-controls='user-menu'
                    aria-haspopup='true'
                    color='inherit'
                    size='large'
                    startIcon={ <AccountCircle/> }
                    onClick={handleOnUserMenuClick}
                >
                    {username }
                </Button>
                <EnhancedUserMenu
                    anchorEl={anchorEl}
                    handleOnUserMenuClose={handleOnUserMenuClose}
                />
            </Toolbar>
        </AppBar>        
    );
}
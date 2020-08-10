import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button,} from '@material-ui/core';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel} from '@material-ui/core';
import {FormGroup,Checkbox} from '@material-ui/core';
import {Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Card, CardActions, CardContent,}  from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
    card: {
      maxWidth: 'auto',
      textAlign: 'center',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),

    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.main
    },
    formLabel: {
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(4),
        paddingTop: theme.spacing(1.5),
        color: theme.palette.primary.light
    },
    radio:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
    },
    radioGroup: {
        verticalAlign: 'middle'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    },
    createAccount: {
      margin: 'auto',
      marginBottom: theme.spacing(2),
    },
    wrapper: {
        margin: 'auto',
        position: 'relative',
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
      fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
      buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
  })


//<HeaderAndSidebar pageBody={<AddUser/>} />

class CreateAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
          loading: false,
          success: false,  
        }
    }

    handleRadioClick = (event) => {
        this.props.handleRadioClick(event.target.value)
    }

    handleCheckBoxClick = (event) => {
        this.props.handleCheckBoxClick([event.target.name], event.target.checked)
    }

    handleTextFieldChanges = (event) => {
        this.props.handleCreatAccountTextFieldsChanges([event.target.name], event.target.value)
    }

    handleConfirmButtonClick = () => {

    }

    handleCreateAccountButtonClick = () => {
        this.props.handleCreateAccountButtonClick()
        //this.set
    }


    render() {

        const {classes} = this.props
        const levels = ["A1", "A2", "B1", "B2", "C1"] 
        const staffRoles = ["ADMIN", "MANAGER", "TEACHER"]
        const buttonClassname = clsx({ [classes.buttonSuccess]: this.props.createAccountProps.accountCreationSuccess, });

        // This are the role names as stored in the datase
        const roles = ["ROLE_STAFF_ADMIN", "ROLE_STAFF_MANAGER", "ROLE_STAFF_TEACHER", "ROLE_STDUENT"]

        console.log("Create Account component: the createAccountProps object is: " + JSON.stringify(this.props.createAccountProps))
        
        return(
            <div>

                <Card className={classes.card} raised>
                    <CardContent>
                    <Typography className={classes.title} 
                            variant= 'h3'
                            color= 'inherit'
                    >
                        Create New Account
                    </Typography>
                    <FormControl component="fieldset">
                            <RadioGroup row value={this.props.createAccountProps.accountType} onChange={this.handleRadioClick} className={classes.radioGroup}>
                                
                                <FormLabel component='label'
                                            className={classes.formLabel}
                                            required
                                >
                                    Choose Account Type:
                                </FormLabel>
                                <FormControlLabel value="student-account"  label="Student Account" 
                                                    labelPlacement="end"   className={classes.radio}
                                                    control={<Radio color="primary"/>} 
                                />
                                <FormControlLabel value="staff-account"  label="Staff Account" 
                                                    labelPlacement="end" className={classes.radio}
                                                    control={<Radio color="primary"/>}
                                />
                            </RadioGroup>
                    </FormControl> <br/> <br/>

                    {this.props.createAccountProps.isStaffAccount ? 
                        (
                            <div>
                                <FormControl component="fieldset" >       
                                    <FormGroup row>
                                    <FormLabel component="label" required className={classes.formLabel}> Choose role(s): </FormLabel>

                                        <FormControlLabel
                                            control={<Checkbox color="primary" checked={this.props.createAccountProps.ROLE_STAFF_ADMIN} onChange={this.handleCheckBoxClick} name={roles[0]} />}
                                            label={staffRoles[0]}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox color="primary" checked={this.props.createAccountProps.ROLE_STAFF_MANAGER}  onChange={this.handleCheckBoxClick} name={roles[1]} />}
                                            label={staffRoles[1]}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox color="primary" checked={this.props.createAccountProps.ROLE_STAFF_TEACHER}  onChange={this.handleCheckBoxClick} name={roles[2]} />}
                                            label={staffRoles[2]}
                                        />
                                    </FormGroup>
                                </FormControl>
                                <br/> <br/>
                            </div>

                        ) : null
                    }
                    <TextField
                        className={classes.textField}
                        id="firstname"
                        type="text"
                        label="First name"
                        name="firstname"
                        required
                        value={this.props.createAccountProps.firstname}
                        onChange={this.handleTextFieldChanges}
                        
                    /><br/> <br/>
                    <TextField
                        className={classes.textField}
                        id="lastname"
                        type="text"
                        label="Last name"
                        name="lastname"
                        required
                        value={this.props.createAccountProps.lastname}
                        onChange={this.handleTextFieldChanges}
                        
                    /><br/> <br/>
                    <TextField
                        className={classes.textField}
                        id="dateOfBirth"
                        type="date"
                        label="Date of birth"
                        name="dateOfBirth"
                        required
                        value={this.props.createAccountProps.dateOfBirth}
                        onChange={this.handleTextFieldChanges}
                    /><br/> <br/>
                    <TextField
                        className={classes.textField}
                        id="phoneNumber"
                        type="tel"
                        label="Phone number"
                        name="phoneNumber"
                        value={this.props.createAccountProps.phoneNumber}
                        onChange={this.handleTextFieldChanges}
                    /><br/> <br/>

                    {this.props.createAccountProps.isStaffAccount ? 
                        (
                            <div>
                                <TextField
                                    className={classes.textField}
                                    id="officePhoneNumber"
                                    type="tel"
                                    label="Office phone number"
                                    name="officePhoneNumber"
                                    value={this.props.createAccountProps.officePhoneNumber}
                                    onChange={this.handleTextFieldChanges}
                                /><br/> <br/>
                            </div>
                        ) : null
                    }

                    <TextField
                        className={classes.textField}
                        id="email"
                        type="email"
                        label="Email"
                        name="email"
                        required
                        value={this.props.createAccountProps.email}
                        onChange={this.handleTextFieldChanges}
                    /><br/> <br/>
                    {!this.props.createAccountProps.isStaffAccount ? 
                        (
                            <div>
                                <TextField
                                    className={classes.textField}
                                    id="currentLevel"
                                    type="text"
                                    label="Current level"
                                    select
                                    SelectProps={{native:true}}
                                    name="currentLevel"
                                    required
                                    value={this.props.createAccountProps.currentLevel}
                                    onChange={this.handleTextFieldChanges}
                                >
                                    {levels.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </TextField><br/> <br/>
                            </div>
                        ) : (
                            <div>
                                <TextField
                                    className={classes.textField}
                                    id="officeNumber"
                                    type="text"
                                    label="Office number"
                                    name="officeNumber"
                                    value={this.props.createAccountProps.officeNumber}
                                    onChange={this.handleTextFieldChanges}
                                /><br/> <br/>
                            </div>
                        )
                    }
                    </CardContent>

                    <CardActions>
                    <div className={classes.wrapper}>
                    <Button 
                    color="primary" variant="contained" 
                    className={classes.createAccount}  
                    onClick={this.props.handleCreateAccountButtonClick}
                        //className={buttonClassname}
                    disabled={this.props.createAccountPropsaccountCreationInProgress}
                    >
                        Create Account
                    </Button>
                    {this.props.createAccountPropsaccountCreationInProgress && <CircularProgress size={50} className={classes.buttonProgress} />}
                    </div>
                        <Dialog
                            open={this.props.createAccountProps.openConfirmationDialog}
                            onClose={this.props.handleCancelOrCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Account Creation"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Do you want to confirm the creation of this account ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.props.handleCancelOrCloseDialog} color="primary">Cancel</Button>
                                <Button  onClick={this.props.handleConfirmButtonClick} color="primary" autoFocus="autofocus" >Confirm</Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions>
                    <br/><br/>   
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(CreateAccount);
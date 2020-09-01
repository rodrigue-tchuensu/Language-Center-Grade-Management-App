import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button,} from '@material-ui/core';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel} from '@material-ui/core';
import {FormGroup,Checkbox} from '@material-ui/core';
import {Card, CardActions, CardContent, Box,}  from '@material-ui/core';
import {Error} from '@material-ui/icons';

import DialogBox from '../feedback/DialogBox'
import CircularProgressWithLabel from '../feedback/CircularProgressWithLabel'

const styles = theme => ({
    card: {
      maxWidth: 'auto',
      textAlign: 'center',
      padding: theme.spacing(5, 0, 2, 0),
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      textAlign: 'center',
      margin: theme.spacing(2, 0, 5, 0),
      color: theme.palette.primary.main
    },
    formLabel: {
        margin: theme.spacing(1.5, 4, 1, 0),
        color: theme.palette.primary.light
    },
    radio:{
        margin: theme.spacing(0, 2, 0, 1),
    },
    radioGroup: {
        verticalAlign: 'middle'
    },
    textField: {
      width: 400
    },
    createAccount: {
      margin: 'auto',
      marginBottom: theme.spacing(2),
    },
  })


class CreateAccount extends React.Component {


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

    handleCreateAccountButtonClick = (event) => {
        
        this.props.handleCreateAccountButtonClick()
        event.preventDefault()
        
    }


    render() {

        const {classes} = this.props
        const levels = ["A1", "A2", "B1", "B2", "C1"] 
        const staffRoles = ["ADMIN", "MANAGER", "TEACHER"]

        // This are the role names as stored in the datase
        const roles = ["ROLE_STAFF_ADMIN", "ROLE_STAFF_MANAGER", "ROLE_STAFF_TEACHER", "ROLE_STDUENT"]
        
        return(
            <div>

                <Card className={classes.card} raised>
                    
                    <Typography className={classes.title} 
                            variant= 'h3'
                            color= 'inherit'
                    >
                        Create New Account
                    </Typography>

                    <form onSubmit={this.handleCreateAccountButtonClick}>
                        <CardContent>
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
                                margin='normal'
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
                                margin='normal'
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
                                margin='normal'
                                id="dateOfBirth"
                                type="date"
                                label="Date of birth"
                                name="dateOfBirth"
                                required
                                value={this.props.createAccountProps.dateOfBirth}
                                onChange={this.handleTextFieldChanges}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /><br/> <br/>
                            <TextField
                                className={classes.textField}
                                margin='normal'
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
                                            margin='normal'
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
                                margin='normal'
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
                                            margin='normal'
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
                                            margin='normal'
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

                            {this.props.createAccountProps.error && (<Box className={classes.error}>
                                <Error color='error'/>
                                <Typography className={classes.errorMessage} color='error'>{this.props.createAccountProps.errorMessage}</Typography>
                            </Box>)}

                        </CardContent>

                        <CardActions>
                    
                            <Button 
                                type="submit"
                                color="primary" 
                                variant="contained" 
                                className={classes.createAccount}  
                            >
                                Create Account
                            </Button>
                        </CardActions>
                    </form>
                </Card>
                <DialogBox 
                    btn2IsVisible={true}
                    open={this.props.createAccountProps.openConfirmationDialog}
                    title="Confirm Account Creation"
                    contentText="Do you want to confirm the creation of this account ?" 
                    btn1Name="Confirm" btn2Name="Cancel" 
                    onclose={this.props.handleCancelOrCloseDialog} 
                    onButton1Click={this.props.handleConfirmButtonClick}
                    onButton2Click={this.props.handleCancelOrCloseDialog}
                />

                <DialogBox 
                    btn2IsVisible={true}
                    open={this.props.createAccountProps.openSuccessDBox}
                    title="Account Creation Successful"
                    contentText={<>The account has successfully been created.<br/> Do you want to create another account ?</>}
                    btn1Name="YES" btn2Name="NO"
                    onclose={this.props.handleCASuccessDBoxOnClose} 
                    onButton1Click={this.props.handleCASuccessDBoxOnButton1Click}
                    onButton2Click={this.props.handleCASuccessDBoxOnButton2Click}
                />
                <CircularProgressWithLabel size={200} label="creation in progress" open={this.props.createAccountProps.accountCreationInProgress}/>

                      
            </div>
        );
    }
}

export default withStyles(styles)(CreateAccount);
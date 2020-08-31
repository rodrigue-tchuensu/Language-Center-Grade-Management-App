import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button,} from '@material-ui/core';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel} from '@material-ui/core';
import {FormGroup,Checkbox} from '@material-ui/core';
import {Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Card, CardActions, CardContent,}  from '@material-ui/core';


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
  })


//<HeaderAndSidebar pageBody={<AddUser/>} />

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

        //console.log("Create Account component: the createAccountProps object is: " + JSON.stringify(this.props.createAccountProps))
        
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
                    </form>
                </Card>
                    
                    <br/><br/>   
                
            </div>
        );
    }
}

export default withStyles(styles)(CreateAccount);
import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {Typography, TextField, Button,} from '@material-ui/core';
import {Card, CardActions, CardContent, Container, Box}  from '@material-ui/core';
import {FormControl, FormGroup, FormControlLabel, Checkbox}  from '@material-ui/core';
import {Error} from '@material-ui/icons';
import DialogBox from '../feedback/DialogBox'

  const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(8, 0, 3, 0),
        textAlign: 'center', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',   
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 4, 0),
        color: theme.palette.primary.main
    },
    textField: {
        marginBottom: theme.spacing(3),
        width: 400
    },
    scheduleBotton: {
        //margin: 'auto',
        marginBottom: theme.spacing(5),
    },
    checkBox:{
        marginRight: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',  
    },
    formGroupLabel: {
        marginRight: theme.spacing(2),
    },
    error: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: theme.spacing(3, 0, 2, 5)
    },
}));






export default function ScheduleExam(props) {

    const handleTextFieldChanges = (event) => {
        props.handleScheduleExamTextFieldsChanges(event.target.name, event.target.value)
    }

    const handleScheduleExamCheckBoxChanges = (event) => {
        props.handleScheduleExamCheckBoxChanges(event.target.name, event.target.checked)
    }

    console.log("the scheduleProps are: " + JSON.stringify(props.scheduleExamProps))
    const classes = useStyles()
    const levels = ["A1", "A2", "B1", "B2", "C1"]
    return(

        <div>
            <Card className={classes.card} raised>
                <CardContent>
                    <Typography 
                    className={classes.title}
                    variant= 'h3'
                    color= 'inherit'
                    >
                        Schedule Exam Date 
                    </Typography><br/>
                    <TextField
                        className={classes.textField}
                        variant='outlined'
                        margin='normal'
                        id="exam_date"
                        type="date"
                        label="Date of Exam"
                        name="examDate"
                        required={true}
                        value={props.scheduleExamProps.examDate}
                        onChange={handleTextFieldChanges}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Container>
                        <div className={classes.container}>
                            <Typography className={classes.formGroupLabel} color='primary'>Choose exam level(s):</Typography>
                            <FormControl>
                                <FormGroup row>
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={<Checkbox color='primary' checked={props.scheduleExamProps.A1Checked} onChange={handleScheduleExamCheckBoxChanges} name={'A1Checked'} />}
                                        label={levels[0]}
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={<Checkbox color='primary' checked={props.scheduleExamProps.A2Checked} onChange={handleScheduleExamCheckBoxChanges} name={'A2Checked'} />}
                                        label={levels[1]}
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={<Checkbox color='primary' checked={props.scheduleExamProps.B1Checked} onChange={handleScheduleExamCheckBoxChanges} name={'B1Checked'} />}
                                        label={levels[2]}
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={<Checkbox color='primary' checked={props.scheduleExamProps.B2Checked} onChange={handleScheduleExamCheckBoxChanges} name={'B2Checked'} />}
                                        label={levels[3]}
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={<Checkbox color='primary' checked={props.scheduleExamProps.C1Checked} onChange={handleScheduleExamCheckBoxChanges} name={'C1Checked'} />}
                                        label={levels[4]}
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                    </Container>
                    {props.scheduleExamProps.error && (<Box className={classes.error}>
                        <Error color='error'/>
                        <Typography className={classes.errorMessage} color='error'>{props.scheduleExamProps.errorMessage}</Typography>
                    </Box>)}

                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" 
                            className={classes.scheduleBotton}
                            onClick={props.handleScheduleExamScheduleButtonClick}
                    >
                        Schedule
                    </Button>
                </CardActions>
            </Card>
            <DialogBox
                open={props.scheduleExamProps.openScheduleExamDBox}
                title="Exam(s) Schedule Confirmation"
                contentText="The Exam(s) have successfully been scheduled" 
                btn1Name='OK'
                onClose={props.handleSEOnDBoxClose}
                onButton1Click={props.handleSEDBoxButtonClick}
            />
        </div>
        
    )
}
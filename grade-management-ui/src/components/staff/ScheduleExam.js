import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {Typography, TextField, Button,} from '@material-ui/core';
import {Card, CardActions, CardContent,}  from '@material-ui/core';


  const useStyles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(3),
        textAlign: 'center',    
    },
    title: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5),
        color: theme.palette.primary.main
    },
    textField: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(5),
        width: 400
    },
    scheduleBotton: {
        margin: 'auto',
        marginBottom: theme.spacing(5),
    }
}));






export default function ScheduleExam(props) {

    const handleTextFieldChanges = (event) => {
        props.handleScheduleExamTextFieldsChanges(event.target.name, event.target.value)
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
                    //display= 'inline'
                    >
                        Schedule Exam Date 
                    </Typography><br/>
                    <TextField
                        className={classes.textField}
                        id="exam_date"
                        type="date"
                        label="Date of Exam"
                        name="examDate"
                        required={true}
                        value={props.scheduleExamProps.examDate}
                        onChange={handleTextFieldChanges}

                    /><br/>
                    <TextField
                        className={classes.textField}
                        id="examLevel"
                        type="text"
                        label="Exam level"
                        select
                        SelectProps={{native:true}}
                        name="examLevel"
                        required={true}
                        value={props.scheduleExamProps.examLevel}
                        onChange={handleTextFieldChanges}
                    >
                        {levels.map((level) => (
                            <option key={level} value={level}>
                            {level}
                            </option>
                        ))}
                    </TextField>
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
        </div>
        
    )
}
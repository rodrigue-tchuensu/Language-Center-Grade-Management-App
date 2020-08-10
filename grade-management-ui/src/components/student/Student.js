import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table'
import { Typography, TextField, InputLabel } from '@material-ui/core';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@material-ui/core';
import {Paper, Toolbar, Container, Grid} from '@material-ui/core';

import Header from './../header/Header'

const request = require ('../../resources/request');

const styles = theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
})

const useStyles = makeStyles((theme) => ({
    fieldset:{
        //backgroundColor: theme.palette.info.light,
        //marginLeft: theme.spacing(60),
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        paddingRight: theme.spacing(5),
        borderStyle: "groove",
        borderColor: theme.palette.info.light,
        maxWidth:500, 
        alignItems:'stretch',
    },
    legend:{
        backgroundColor: "#FFFAFA",
        color: theme.palette.secondary.main,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    textFieldSelect: {
        marginBottom: theme.spacing(3),
        marginRight: theme.spacing(40),
        backgroundColor: "#FFFFFF",
        maxWidth: 150,
        minWidth: 150,
        flexGrow: 1,
    },
    labelDetail: {
        marginLeft: theme.spacing(5),
    },
    toolbar: {
        paddingTop: theme.spacing(2.5),
        maxWidth: 800,
    },
    span: {
        color: theme.palette.primary.main,
    },
    table: {
        width: 1165,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    paper: {
        width: 1200,
    },
}))



function EnhancedDetailsInput(props) {
    const classes = useStyles()
    return(
        <span>
            <pre>
                <Typography className={classes.labelDetail} display='inline'><b><span className={classes.span}>{props.label}</span></b> {props.value}</Typography>
            </pre>
        </span>
    )
}

function EnhancedStudentDetails(props) {
    const classes = useStyles()
    const studentDetails = props.studentDetails
    
    return(
        <div>
            
            <Grid item>
                <fieldset className={classes.fieldset}>
                    <legend className={classes.legend}>Student Details</legend>
                    <EnhancedDetailsInput label={'First name:             '} value={studentDetails.firstname}/>
                    <EnhancedDetailsInput label={'Last name:              '} value={studentDetails.lastname}/>
                    <EnhancedDetailsInput label={'Date of birth:          '} value={studentDetails.dateOfBirth}/>
                    <EnhancedDetailsInput label={'Phone:                     '} value={studentDetails.phoneNumber}/>
                    <EnhancedDetailsInput label={'Email:                       '} value={studentDetails.email}/>
                    <EnhancedDetailsInput label={'Current level:          '} value={studentDetails.currentLevel}/>
                </fieldset>
            </Grid>
              
        </div>
    )
}

function EnhancedToolbar(props) {
    const classes = useStyles()
    const dates = props.dates

    const handleOnDateSelect = (event) => {
        props.handleOnDateSelect(event.target.value)
    }

    return (
        <div>
            <Toolbar className={classes.toolbar}>
                <TextField
                    className={classes.textFieldSelect}
                    id="choosenDate"
                    label='Choose a date'
                    variant='outlined'
                    //size='small'
                    helperText='Exam Session Date'
                    select
                    SelectProps={{native:true}}
                    value={props.choosenDate}
                    onChange={handleOnDateSelect}
                >
                    {
                        dates.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))
                    }
                </TextField>
                <Typography className={classes.titleToolbar} color='primary' variant='h5'>Marks Report &nbsp; {props.level}</Typography>
            </Toolbar>
        </div>
    )
}

function MarksSummaryReport(props) {

    const classes = useStyles()
    const examMarks = props.examMarks
    console.log("In Enhanced marks summary report, the value of props.examMarksis => " + JSON.stringify(examMarks))
    return(
        <div>
            <Grid item>
            <Paper className={classes.paper} elevation={3}>
            <EnhancedToolbar level={props.level} dates={props.dates}
                handleOnDateSelect={props.handleOnDateSelect}
                choosenDate={props.choosenDate}
            />
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        examMarks.map((mark) => (
                            <TableRow key={mark.subjectName}>
                                <TableCell>{mark.subjectName}</TableCell>
                                <TableCell>{mark.score}</TableCell>
                                <TableCell>{mark.status}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            </Paper>
            </Grid>
        </div>
    )
}




class Student extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            marks: [],
            studentDetails:{},
            examsDates: [],
            choosenDate: "",
            marksReportLevel: "",
            studentNumber: request.auth.getAvailableUserDetails().studentOrStaffNumber,
        }
    }

    //todo: remember to add an argument to the fxn
    fetchtMarksData = (studentNb, selectedDate) => {
        console.log(`The value of studentNumber=${studentNb} and the value of selectedDates= ${selectedDate}`)
        request.get(`marks/exam-report/?studentNumber=${studentNb}&examDate=${selectedDate}`, (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
                this.setState({marks: res.body})
                if(res.body && res.body.length > 0) {
                    this.setState({marksReportLevel: res.body[0].examLevel})
                }
            }
        })
    }

    fetchExamsDates = (studentNb) => {
        request.get(`marks/exam-dates?studentNumber=${studentNb}`, (err, res) => {
            if(err) {
                console.log(err)
            }else {
                console.log(res)
                this.setState({examsDates: res.body})
                if(res.body && res.body.length > 0) { 
                    this.setState({choosenDate: res.body[0]})
                }
            }
        })
    }

    //todo: remember to add an argument to the fxn
    fetchStudentData = (studentNb) => {
        request.get(`students/${studentNb}`, (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
                this.setState({studentDetails: res.body})
            }
        })
    }

    fetchMarksDataOnComponentMount = (studentNumber) => { 
        request.get(`marks/latest-completely-assessed-exam-session?studentNumber=${studentNumber}`, (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
                this.setState({marks: res.body})
                if(res.body && res.body.length > 0) {
                    this.setState({marksReportLevel: res.body[0].examLevel})
                }
                    
            }
        })
    }

    handleOnDateSelect = (choosenDate) => {
        this.fetchtMarksData(this.state.studentNumber, choosenDate)
        this.setState({choosenDate: choosenDate})
    }


    componentDidMount = () => {
        this.fetchStudentData(this.state.studentNumber)
        this.fetchExamsDates(this.state.studentNumber)
        this.fetchMarksDataOnComponentMount(this.state.studentNumber)
        
    }

    render() {
        const {classes} = this.props
        
        return(
            <div className={classes.root}>
            <Header/>
            <Grid container justify='center' >
                <EnhancedStudentDetails studentDetails={this.state.studentDetails} />
                <MarksSummaryReport
                    level={this.state.marksReportLevel}
                    studentDetails={this.state.studentDetails}
                    examMarks={this.state.marks}
                    dates={this.state.examsDates}
                    choosenDate={this.state.choosenDate}
                    handleOnDateSelect={this.handleOnDateSelect}
                />
            </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(Student)
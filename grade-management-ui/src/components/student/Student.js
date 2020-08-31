import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, TextField, } from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';
import {Paper, Toolbar, Container,} from '@material-ui/core';

import Header           from './../header/Header'
import PasswordChange   from '../credentials/PasswordChange'

const request = require ('../../resources/request');

const styles = theme => ({
    views: {
        marginTop: theme.spacing(8),
    },
    passwordChange: {
        marginTop: theme.spacing(4),
    }
})

const useStyles = makeStyles((theme) => ({
    fieldset:{
        margin: theme.spacing(8, 0, 8, 0),
        paddingRight: theme.spacing(5),
        borderStyle: "groove",
        borderColor: theme.palette.info.light,
        maxWidth:500, 
        alignItems:'stretch',
    },
    legend:{
        backgroundColor: "#FFFAFA",
        color: theme.palette.secondary.main,
        padding: theme.spacing(1, 1, 1, 1),
    },
    textFieldSelect: {
        margin: theme.spacing(0,40,3,0),
        backgroundColor: "#FFFFFF",
        maxWidth: 150,
        flexGrow: 1,
    },
    labelDetail: {
        marginLeft: theme.spacing(5),
    },
    toolbar: {
        paddingTop: theme.spacing(2.5),
        //maxWidth: 800,
    },
    span: {
        color: theme.palette.primary.main,
    },
    table: {
        width: 1165,
        margin: theme.spacing(0, 3, 0, 3),
    },
    paper: {
        width: 1200,
        marginBottom: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    passwordChange: {
        marginTop: theme.spacing(4),
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
                <fieldset className={classes.fieldset}>
                    <legend className={classes.legend}>Student Details</legend>
                    <EnhancedDetailsInput label={'First name:             '} value={studentDetails.firstname}/>
                    <EnhancedDetailsInput label={'Last name:              '} value={studentDetails.lastname}/>
                    <EnhancedDetailsInput label={'Date of birth:          '} value={studentDetails.dateOfBirth}/>
                    <EnhancedDetailsInput label={'Phone:                     '} value={studentDetails.phoneNumber}/>
                    <EnhancedDetailsInput label={'Email:                       '} value={studentDetails.email}/>
                    <EnhancedDetailsInput label={'Current level:          '} value={studentDetails.currentLevel}/>
                </fieldset>
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
                <Typography  color='primary' variant='h5'>Marks Report &nbsp; {props.level}</Typography>
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
        </div>
    )
}

function StudentReportCard(props) {
    const classes = useStyles()
    
    return(
        <Container component='main'>
            <div className={classes.container}>
                <EnhancedStudentDetails studentDetails={props.studentReportCardProps.studentDetails} />
                <MarksSummaryReport
                    level={props.studentReportCardProps.level}
                    studentDetails={props.studentReportCardProps.studentDetails}
                    examMarks={props.studentReportCardProps.examMarks}
                    dates={props.studentReportCardProps.dates}
                    choosenDate={props.studentReportCardProps.choosenDate}
                    handleOnDateSelect={props.studentReportCardProps.handleOnDateSelect}
                />
            </div>
        </Container>
    );
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

    renderStudentViews = (views) => {
        
        switch(views) {
            case "report-card":
                const studentReportCardProps = {
                    studentDetails:this.state.studentDetails,
                    level: this.state.marksReportLevel,
                    examMarks:this.state.marks,
                    dates:this.state.examsDates,
                    choosenDate:this.state.choosenDate,
                    handleOnDateSelect:this.handleOnDateSelect,
                }

                return(
                    <StudentReportCard studentReportCardProps={studentReportCardProps}/>
                );
            case "password-change":
                return(
                    <div style={{marginTop: '110px'}}>
                        <PasswordChange/>  
                    </div>
                );
            default:
                break;
        }
    }


    render() {
        const {classes} = this.props

        return(
            <div>
                <Header/>
                <div className={classes.views}>
                    {this.renderStudentViews(this.props.match.params.option)}
                </div>
                
            </div>
        )
    }

}

export default withStyles(styles)(Student)
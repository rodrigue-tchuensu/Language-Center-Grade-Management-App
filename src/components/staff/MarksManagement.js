import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table'
import {Dialog,DialogActions, DialogContent, TextField, Typography, Box, } from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow, Toolbar, CircularProgress} from '@material-ui/core';
import {Button, Container} from '@material-ui/core';
import {Save} from '@material-ui/icons';


const request = require ('../../resources/request');



const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    legend:{
        backgroundColor: "#FFFAFA",
        color: theme.palette.secondary.main,
        padding: theme.spacing(1, 1, 1, 1),
    },
    divFieldset:{
        textAlign:'center'
    },
    fieldset:{
        //backgroundColor: theme.palette.info.light,
        margin: theme.spacing(4, 0, 6, 0),
        borderStyle: "groove",
        borderColor: theme.palette.info.light,
        maxWidth:600,    
    },
    textField: {
        margin: theme.spacing(4, 10, 3, 4),
        minWidth: 150,
        //borderColor: theme.palette.secondary.main,
        backgroundColor: "#FFFFFF",
    },
    button: {
        margin: theme.spacing(4, 0, 3, 0),
        minHeight: 60,
        //minWidth: 150,  
    },
    toolbar: {
        margin: theme.spacing(1.5, 0, 1,0),
    },
    toolbarMarksSummaryTable: {
        alignItems: 'flex-start',
        padding: theme.spacing(2, 0, 2, 0),
    },
    titleMarksSummaryTable: {
        flexGrow: 1,
        marginRight: theme.spacing(15)   
    },
    selectMarksSummaryTable: {
        flexGrow: 1,
    },
    markAssignmentToolbarTitle: {
        flexGrow: 1,
        marginRight: theme.spacing(15)
    },
    progress: {
        margin: theme.spacing(0, 1.5, 0, 1),
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    }  
}));


const subjects = ["Grammar", "Reading  Comprehension", "Listening  Comprehension", "Text Production"]


const levels = ["A1", "A2", "B1", "B2", "C1"]



function MarkAssignmentTable(props) {

    const classes = useStyles();

    const [score, setScore] = useState(0.0)
    const [selectedSubject, setSelectedSubject] = useState("Grammar")
    const [latestExamDate, setLatestExamDate] = useState("") 

    const handleOnSubjectSelectChange = (event) => {
        setSelectedSubject(event.target.value)
    }

    const handleOnScoreChange = (event) => {
        setScore(event.target.value)
    }

    const handleOnSaveButtonClick = () => {

        const markDto = {
            subjectName: selectedSubject,
            score: score,
            studentNumber: props.studentNumber,
            staffNumber: props.staffNumber,
            examDate: latestExamDate,
            examLevel: props.examLevel,
        }

        request.post(`marks`, markDto, (err, res) => {

            if(err) {

            } else {

            }
        })
    }

    const fetchLatestDate = () => {
        
        request.get(`exams/latest-date`, (err, res) => {
            if(err) {
                
            } else {
                
                setLatestExamDate(res.body)
            }
        })
    }

    useEffect(() => {
        fetchLatestDate()
    }, [])

    //console.log(`the value of score: ${score} and the value of selectedSubject: ${selectedSubject}`)
    return(
        <div>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h5" color="primary" className={classes.markAssignmentToolbarTitle}>{props.studentFullName}</Typography>
            <Typography variant="h5" color="primary"><b>Exam Date:</b> {latestExamDate}</Typography>
        </Toolbar>
        <Table className={classes.table} aria-label="simple table">

            <TableHead>
                <TableRow>
                    <TableCell><Typography variant="h6">Subjects</Typography></TableCell>
                    <TableCell align="center"><Typography variant="h6">Socred Mark</Typography></TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow key="subject">
                    <TableCell component="th" scope="row">
                        <TextField
                            id="select subject"
                            label="Select Subject"
                            type="text"
                            select
                            SelectProps={{native:true}}
                            variant="outlined"
                            name="selectedSubject"
                            value={selectedSubject}
                            onChange={handleOnSubjectSelectChange}
                        >
                            {
                                subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))
                            }
                        </TextField>
                    </TableCell>

                    <TableCell align="center">
                        <TextField 
                            variant="outlined" 
                            label="Score"
                            size='small'
                            name="score"
                            value={score}
                            onChange={handleOnScoreChange}
                        />
                    </TableCell>

                    <TableCell align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<Save/>}
                            onClick={handleOnSaveButtonClick}
                        >
                            assess
                        </Button>
                    </TableCell>
                    
                </TableRow>
            </TableBody>
        </Table>
        </div>
    );

}

//className={classes.markToolbarTitle}

function MarksSummaryTable(props) {

    const classes = useStyles();
    const [examsDates, setExamsDates] = useState([]) 
    const [selectedDate, setSelectedDate] = useState("")
    const [marks, setMarks] = useState([])
    const [examLevel, setExamLevel] = useState("")
    
    const fetchDatesData = (studentNumber) => {

        request.get(`marks/exam-dates?studentNumber=${studentNumber}`, (err, res) => {
            if(err) {
                
            } else {
                setExamsDates(res.body)
                if(res.body && res.body.length > 0) { 
                    setSelectedDate(res.body[0])
                }
                
            }
        })
    }

    const fetchMarksData = (studentNumber, examDate) => {
        
        request.get(`marks?studentNumber=${studentNumber}&examDate=${examDate}`, (err, res) => {
            if(err) {
               
            } else {
                //console.log(res.body)
                setMarks(res.body)
                if(res.body && res.body.length > 0) {
                    setExamLevel(res.body[0].examLevel)
                }  
            }
        })
    }

    const fetchMarksDataOnComponentMount = (studentNumber) => {

        request.get(`marks/latest-completely-assessed-exam-session?studentNumber=${studentNumber}`, (err, res) => {
            if(err) {
                
            } else {
                //console.log(res)
                setMarks(res.body)
                if(res.body && res.body.length > 0) {
                    setExamLevel(res.body[0].examLevel)
                }
                    
            }
        })
    }

    const handleOnSelectChange = (event) => {
        const choosenDate = event.target.value
        setSelectedDate(event.target.choosenDate)
        fetchMarksData(props.studentNumber, choosenDate) 
    }

    useEffect(() => {
        fetchDatesData(props.studentNumber)
        fetchMarksDataOnComponentMount (props.studentNumber)
    }, [])

    return(
        <div>
            
                <Toolbar className={classes.toolbarMarksSummaryTable}>
                    <Typography variant="h6" color="primary" className={classes.titleMarksSummaryTable}>{props.studentFullName}</Typography>
                    <Typography variant="h6" color="primary" >Exam Level {examLevel}</Typography>  
                     
                </Toolbar>
                <Toolbar>
                    <TextField
                        id="examDate"
                        select
                        SelectProps={{native: true}}
                        variant="outlined"
                        helperText="choose exam date"
                        value={selectedDate}
                        onChange={handleOnSelectChange}   
                    >
                        {
                            examsDates.map((date) => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))
                        }
                    </TextField>
                </Toolbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Subjects</Typography></TableCell>
                            <TableCell align="center"><Typography variant="h6">Scores</Typography></TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            marks.map((mark) => (
                                <TableRow key={mark.subjectName}>
                                    <TableCell>{mark.subjectName}</TableCell>
                                    <TableCell align="center">{mark.score}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            
        </div>
    );
}






export default function MarksManagement(props) {
        const [data, setData] = useState([])
        const [level, setLevel] = useState("A1")
        const [tableTitle, setTableTitle] = useState("A1  Students")
        const [openDialogBox, setOpenDialogBox] = useState(false)
        const [openSummaryTable, setOpenSummaryTable] = useState(false)
        const [selectedStudentStudentNumber, setSelectedStudentStudentNumber] = useState("")
        const [selectedStudentFullname, setSelectedStudentFullname] = useState("")
        const [importingStudentsByLevel, setImportingStudentsByLevel] = useState(false)
        
        const classes = useStyles();
       
        const staffnumber = request.auth.getAvailableUserDetails().studentOrStaffNumber
        

        const handleSelectLevelChange = (event) => {
            setLevel(event.target.value)
        }

        const fetchStudentsData = () => {
            request.get(`students/limitedInfos?level=${level}`, (err, res) => {
                if(err){
                    
                }
                else {
                    setData(res.body)
                }
                setImportingStudentsByLevel(false)
            })
        }

        useEffect(() => fetchStudentsData(), [])

        const handleImportStudentButtonClick = () => {
            setImportingStudentsByLevel(true)
            fetchStudentsData()
            setTableTitle(level + "  Students")
        }

        const handleClosedDialogBox = () => {
            setOpenDialogBox(false)
        }

        const handleCloseSummaryTable = () => {
            setOpenSummaryTable(false)
        }


        const userDetail = request.auth.getAvailableUserDetails()

        return (
            
            <div>
                <div >
                <div className={classes.columnContainer}>
                    <fieldset className={classes.fieldset}>
                        
                        <Container className={classes.container}>
                        <TextField
                            className={classes.textField}
                            id="desiredLevel"
                            label="Level"
                            select
                            SelectProps={{native:true}}
                            name="level"
                            required={true}
                            variant="outlined"
                            value={level}
                            onChange={handleSelectLevelChange}
                        >
                            {levels.map((levl) => (
                                <option key={levl} value={levl}>
                                {levl}
                                </option>
                            ))}
                        </TextField>
                        <Button className={classes.button}
                                color="primary" variant="contained" 
                                //size='small'
                                onClick={handleImportStudentButtonClick}
                        >
                            <Box className={classes.rowContainer}>
                                {!importingStudentsByLevel ? `import ${level} students` : <><CircularProgress color='inherit' size={30} className={classes.progress}/> {`Importing ${level} students`} </>}
                            </Box>
                        </Button>
                        </Container>
                    </fieldset>
                    
                </div>



                <MaterialTable
                    title={tableTitle}
                    columns={[
                        {title: 'Student No.', field: 'studentNumber'},
                        {title: 'Name', field: 'name'},
                        {title: 'Date of birth', field: 'dateOfBirth'},
                    ]}
                    data={data.map((student) => (
                        {studentNumber: student.studentNumber,
                         name: student.fullname ,
                         dateOfBirth: student.dateOfBirth,
                        }
                    ))}

                    actions= {[
                        {
                            icon: 'class',
                            tooltip: 'View student grades ',
                            onClick: (event, rowData) => {
                                setOpenSummaryTable(true)
                                setSelectedStudentStudentNumber(rowData.studentNumber)
                                setSelectedStudentFullname(rowData.name)

                            }
                        },
                        (userDetail.roles.indexOf("ROLE_STAFF_TEACHER") > -1 ? ({
                            icon: 'edit',
                            tooltip: 'Edit Student Marks',
                            onClick: (event, rowData) => {

                                setOpenDialogBox(true)
                                setSelectedStudentFullname(rowData.name)
                                setSelectedStudentStudentNumber(rowData.studentNumber)
                            }
                        }): null),
                        
                    ]}

                    options={{
                        search: true,
                        headerStyle:{backgroundColor:'#4791db', color:'white'},
                    }}
                    components={{
                                    Toolbar: props => (
                                        <div style={{color: '#115293', 
                                                     fontSize: '3.5em',
                                                     fontWeight: 'bold', 
                                                     paddingBottom: '25px',
                                                     paddingTop: '10px',
                                                     }}>
                                        <MTableToolbar {...props} />
                                        </div>
                                    )
                    }}
                />
                </div>

                
                
                <div >
                    <Dialog
                        open={openDialogBox}
                        onClose={handleClosedDialogBox}
                        maxWidth='xl'
                    >
                        <DialogContent>

                            <MarkAssignmentTable
                                studentNumber={selectedStudentStudentNumber}
                                staffNumber={staffnumber}
                                examLevel={level}
                                studentFullName={selectedStudentFullname}
                            />

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClosedDialogBox} color="primary">Done</Button>
                        </DialogActions>

                    </Dialog>
                </div>


                <div >
                    <Dialog
                        open={openSummaryTable}
                        onClose={handleCloseSummaryTable}
                        maxWidth='xl'
                    >
                        <DialogContent>

                            <MarksSummaryTable
                                studentNumber={selectedStudentStudentNumber}
                                studentFullName={selectedStudentFullname}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSummaryTable} color="primary">Done</Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </div>
        );
    
}
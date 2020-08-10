import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table'
import {Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Button,} from '@material-ui/core';

import DetailInputTag from './DetailInputTag';

const request = require ('../../resources/request');



const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
}));

export default function StudentTable(props) {
        const [studentsLimitedData, setStudentsLimitedData] = useState([])
        const [studentsDetailedData, setStudentsDetailedData] = useState({})
        const [showDetails, setShowDetails] = useState(false)
        const classes = useStyles();
        const tableTitle = props.tableTitle;

        const handleCloseDialog = () => {
            setShowDetails(false)
        }

        const fetchData = () => {
            request.get('students/limitedInfos', (err, res) => {
                if(err){
                    console.log("Error: fetching student data using the api failed")
                }
                else {
                    setStudentsLimitedData(res.body)
                }
            })
        }

        useEffect(() => fetchData(), [])



        return (
            
            <div>

                <MaterialTable
                    title={tableTitle}
                    columns={[
                        {title: 'Student No.', field: 'studentNumber'},
                        {title: 'Name', field: 'name'},
                        {title: 'Date of birth', field: 'dateOfBirth'},
                    ]}
                    data={studentsLimitedData.map((student) => (
                        {studentNumber: student.studentNumber,
                         name: student.fullname ,
                         dateOfBirth: student.dateOfBirth,
                        }
                    ))}

                    actions= {[
                        {
                            icon: 'emoji_people',
                            tooltip: 'More details ...',
                            onClick: (event, rowData) => {
                                console.log("the value of the StudentNumber is: " + rowData.studentNumber)
                                request.get('students/' + rowData.studentNumber, (err, res) => {

                                    if(err) {
                                        console.log("Erreur: Could not load the specified staff details")
                                    }
                                    else {
                                        console.log("Succes: The staff detail data was successfully loaded\n You can see the response below")
                                        console.log(res)
                                        //this.setState({ detailDatat: res.body, showDetails: true})
                                        setStudentsDetailedData(res.body)
                                        setShowDetails(true)
                                        //this.setState({showDetails: true})
                                    }
                                })
                            }
                        }
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

                <Dialog open={showDetails}
                        onClose={handleCloseDialog}
                >
                    <DialogTitle id="more-info-dialog-title">Student Detail Information</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <DetailInputTag labelName="Student Number:" inputValue={studentsDetailedData.studentNumber}/>
                            <DetailInputTag labelName="First Name:" inputValue={studentsDetailedData.firstname}></DetailInputTag>
                            <DetailInputTag labelName="Last Name:" inputValue={studentsDetailedData.lastname}/>
                            <DetailInputTag labelName="Date of Birth:" inputValue={studentsDetailedData.dateOfBirth}/>
                            <DetailInputTag labelName="Phone Number:" inputValue={studentsDetailedData.phoneNumber}/>
                            <DetailInputTag labelName="Email:" inputValue={studentsDetailedData.email}/>
                            <DetailInputTag labelName="Current Level:" inputValue={studentsDetailedData.currentLevel}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleCloseDialog} >Close</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    
}
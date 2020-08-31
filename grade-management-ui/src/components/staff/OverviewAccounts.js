import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'

import StaffTable from '../userTables/StaffTable'
import StudentTable from '../userTables/StudentTable'

const request = require ('../../resources/request');


const useStyles= makeStyles((theme) => ({
    table:{
        marginBottom: theme.spacing(6),
    },
    title:{
        textAlign: 'center',
        margin:theme.spacing(4, 0, 3),
        color: theme.palette.primary.main
    },
}));




const studentTableTitle = "LLCE Students";
const staffTableTitle = "LLCE Staff"
const studentTableHeaderNames = ["Student Nr. ", "Name", "Date of Birth", "Phone Nr.", "E-Mail"];
const staffTableHeaderNames = ["Staff Nr. ", "Name", "Date of Birth", "Phone Nr.", "E-Mail", "Office Phone Nr.", "Office Nr."];



export default function OverviewAccounts(props) {
    const classes = useStyles();
    const userDetail = request.auth.getAvailableUserDetails()
    return(
        <div >
            <Typography className={classes.title} 
                        variant= 'h3'
            >
                LLCE ACCOUNTS OVERVIEW
            </Typography>
             
            { (userDetail.roles.indexOf("ROLE_STAFF_ADMIN") > -1 || userDetail.roles.indexOf("ROLE_STAFF_MANAGER") > -1) ?
                (<div className={classes.table}>
                    <StaffTable
                        tableTitle={staffTableTitle}
                        tableHeaderNames={staffTableHeaderNames}
                        className={classes.table}
                    />
                </div>) : null
            }

            <div className={classes.table}>
                <StudentTable 
                    tableTitle={studentTableTitle}
                    tableHeaderNames={studentTableHeaderNames}
                />
            </div>
        </div>
    )
}


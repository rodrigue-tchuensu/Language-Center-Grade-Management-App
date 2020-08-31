import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {Paper} from '@material-ui/core';

import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
//import HeaderAndSidebar from   '../header/HeaderAndSidebar'
import OverviewAccounts from   './OverviewAccounts'
import CreateAccount    from   './CreateAccount'
import ScheduleExam     from   './ScheduleExam'
import MarksManagement  from   './MarksManagement'
import PasswordChange   from   '../credentials/PasswordChange'

const request = require('../../resources/request')


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  paperMain: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100%',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  table: {
    minWidth: 1000,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
});





class Staff extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
          //sidebar component props
            openAccountsButton: false,
            openMarksExamsButton: false,
            staffView: this.props.match.params.option, //"accounts_view"

          //CreateAccount component props
            accountType: "student-account",
            isStaffAccount: false,
            ROLE_STAFF_ADMIN: false,
            ROLE_STAFF_MANAGER: false,
            ROLE_STAFF_TEACHER: false,
            firstname: "",
            lastname: "",
            dateOfBirth: "",
            phoneNumber: "",
            email: "",
            currentLevel: "A1",
            officePhoneNumber: "",
            officeNumber: "",
            openConfirmationDialog: false,
            accountCreationInProgress: false,
            accountCreationSuccess: false,

          //EdithAccount component props

          //ScheduleExam component props
          examDate: "",
          examLevel: "A1", //default value
          A1Checked: false,
          A2Checked: false,
          B1Checked: false,
          B2Checked: false,
          C1Checked: false,
        }
    }


    static getDerivegetDerivedStateFromProps(props, state) {

        console.log("getDerivegetDerivedStateFromProps fxn fired!")
        if(props.match.params.option !== state.staffView) {
            return {
                staffView: props.match.params.option
            }
        }
        return null;
    }

    clearCreateAccountFormOnAccountCreationSuccessful = () => {
        this.setState({
            accountType: "student-account",
            isStaffAccount: false,
            ROLE_STAFF_ADMIN: false,
            ROLE_STAFF_MANAGER: false,
            ROLE_STAFF_TEACHER: false,
            firstname: "",
            lastname: "",
            dateOfBirth: "",
            phoneNumber: "",
            email: "",
            currentLevel: "A1",
            officePhoneNumber: "",
            officeNumber: "",
            openConfirmationDialog: false,
            accountCreationInProgress: false,
            accountCreationSuccess: false,
        })
    }


    // Eventhandler for the sidebar component
    handleAccountsButtonClick = () => {

        this.setState((state) => ({
            openAccountsButton: !state.openAccountsButton
        }));
    }

    handleClickView = () => {
        this.props.history.push('/staffs/accounts/view')
        //this.setState({staffView: "accounts_view"})
        
    }

    handleClickCreate = () => {
        this.props.history.push('/staffs/accounts/create')
        //this.setState({staffView: "accounts_create"})
    }

    handleClickEdit = () => {
        this.props.history.push('/staffs/accounts/edit')
        //this.setState({staffView: "accounts_edit"})
    }

    handleClickDelete = () => {
        this.props.history.push('/staffs/accounts/delete')
        //this.setState({staffView: "accounts_delete"})
    }

    handleClickManageMarks = () => {
        this.props.history.push('/staffs/marks-exams/manage-marks')
         
        this.setState({staffView: "manage_marks"})
    }

    handleClickScheduleExams = () => {
        this.props.history.push('/staffs/marks-exams/schedule-exams')
        this.setState({staffView: "schedule_exams"})
    }


    handleMarksExamsButtonClick = () => {
        this.setState((state) => ({
            openMarksExamsButton: !state.openMarksExamsButton
        }));
    }



    //Eventhandlers for the creatAccount component 
    handleRadioClick = (accountType) => {
        this.setState({accountType})
        this.setState((state) => ({
            isStaffAccount: state.accountType === "staff-account" ? true : false
        }))
    }

    handleCheckBoxClick = (stateProp, value) =>{
        this.setState({[stateProp]: value})
    }

    handleCreatAccountTextFieldsChanges = (stateProp, value) => {
        this.setState({[stateProp]: value})
    }
    
    handleCreateAccountButtonClick = () => {
        this.setState({openConfirmationDialog: true})
    }

    handleCancelOrCloseDialog = () => {
        this.setState({openConfirmationDialog: false})
    }

    handleConfirmButtonClick = () => {

        this.setState({openConfirmationDialog: false})
        
        const rolesDto = []
        const userData = {
            firstname: this.state.firstname || undefined,
            lastname: this.state.lastname || undefined,
            dateOfBirth: this.state.dateOfBirth || undefined,
            phoneNumber: this.state.phoneNumber || undefined,
            email: this.state.email || undefined,

        }


        if(this.state.isStaffAccount){

            userData.officePhoneNumber = this.state.officePhoneNumber || undefined
            userData.officeNumber = this.state.officeNumber || undefined
            if(this.state.ROLE_STAFF_ADMIN) {
                rolesDto.push("ROLE_STAFF_ADMIN")
            }
            if(this.state.ROLE_STAFF_MANAGER) {
                rolesDto.push("ROLE_STAFF_MANAGER")
            }
            if(this.state.ROLE_STAFF_TEACHER) {
                rolesDto.push("ROLE_STAFF_TEACHER")
            }

            //send the account data to the server through th api
            const staffDto = userData
            const staffAccountDataDto = {staffDto, rolesDto}

           //console.log("representation of the staffAccountDataDto => \n " + staffAccountDataDto )
            
            
            request.post('staffs',staffAccountDataDto, (err, res) => {
                
                if(err) {
                    //console.log("Error_Staff_Account_Creation: the api post request, reported an error! \n See error response below: ")
                    //console.log(err)
                    this.setState({accountCreationSuccess: false})
                }
                else {
                    //console.log("Success: the api post request was successful! \n See success response below")
                    //console.log(res)
                    this.setState({accountCreationSuccess: true})
                    this.clearCreateAccountFormOnAccountCreationSuccessful()
                }
            });

        } else {
            userData.currentLevel = this.state.currentLevel || undefined
            rolesDto.push("ROLE_STUDENT")
            
            const studentDto = userData;
            const studentAccountDataDto = {studentDto, rolesDto}
            //console.log("representation of the studentAccountDataDto => \n " + JSON.stringify(studentAccountDataDto) )

            request.post('students', studentAccountDataDto, (err, res) => {

                if(err) {
                    console.log("Error_Student_Account_Creation: the api post request, reported an error! \n See error response below: ")
                    //console.log(err)
                    this.setState({accountCreationSuccess: false})
                }
                else {
                    console.log("Success: the api post request was successful! \n See success response below")
                    console.log(res)
                    this.setState({accountCreationSuccess: true})
                    this.clearCreateAccountFormOnAccountCreationSuccessful()
                }
            });
        }
    }

    //Eventhandler for scheduleExam component 
    handleScheduleExamTextFieldsChanges = (stateProp, value) => {
        this.setState({[stateProp]: value})
    }

    handleScheduleExamCheckBoxChanges = (stateProp, value) => {
        this.setState({[stateProp]: value})
    }

    handleScheduleExamScheduleButtonClick = () => {

        const scheduledExamsDataDto = {
            examDate: this.state.examDate || undefined,
            examLevels:[]
        }
        if(this.state.A1Checked) {
            scheduledExamsDataDto.examLevels.push('A1')
        }
        if(this.state.A2Checked) {
            scheduledExamsDataDto.examLevels.push('A2')
        }
        if(this.state.B1Checked) {
            scheduledExamsDataDto.examLevels.push('B1')
        }
        if(this.state.B2Checked) {
            scheduledExamsDataDto.examLevels.push('B2')
        }
        if(this.state.C1Checked) {
            scheduledExamsDataDto.examLevels.push('C1')
        }

        console.log(JSON.stringify(scheduledExamsDataDto))

        request.post('exams', scheduledExamsDataDto, (err, res) => {

            if(err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
    }



    renderStaffViews = (views) => {
        switch(views) {
            case "view":
                //return viewAccounts view component
                return <OverviewAccounts/>
            case "create":
                //return createAccount view component
                const createAccountProps = {
                    accountType: this.state.accountType,
                    isStaffAccount: this.state.isStaffAccount,
                    ROLE_STAFF_ADMIN: this.state.ROLE_STAFF_ADMIN,
                    ROLE_STAFF_MANAGER: this.state.ROLE_STAFF_MANAGER,
                    ROLE_STAFF_TEACHER: this.state.ROLE_STAFF_TEACHER,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    dateOfBirth: this.state.dateOfBirth,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    currentLevel: this.state.currentLevel,
                    officePhoneNumber: this.state.officePhoneNumber,
                    officeNumber: this.state.officeNumber,
                    openConfirmationDialog: this.state.openConfirmationDialog,
                    accountCreationInProgress: this.state.accountCreationInProgress,
                    accountCreationSuccess: this.state.accountCreationSuccess,
                }
                return <CreateAccount 
                            createAccountProps={createAccountProps}
                            handleRadioClick={this.handleRadioClick }
                            handleCheckBoxClick={this.handleCheckBoxClick}
                            handleCreatAccountTextFieldsChanges={this.handleCreatAccountTextFieldsChanges}
                            handleCreateAccountButtonClick={this.handleCreateAccountButtonClick}
                            handleCancelOrCloseDialog={this.handleCancelOrCloseDialog}
                            handleConfirmButtonClick={this.handleConfirmButtonClick }
                       />
            case "edith":
                //return edithAccount view component
                break;
            case "delete":
                //return deleteAccount view component
                break;
            case "manage-marks":
                return(
                    <MarksManagement/>
                )
            case "schedule-exams":
                const scheduleExamProps = {
                    examDate: this.state.examDate,
                    examLevel: this.state.examLevel,
                    A1Checked: this.state.A1Checked,
                    A2Checked: this.state.A2Checked,
                    B1Checked: this.state.B1Checked,
                    B2Checked: this.state.B2Checked,
                    C1Checked: this.state.C1Checked,
                }
                return(
                    <ScheduleExam
                        scheduleExamProps={scheduleExamProps}
                        handleScheduleExamTextFieldsChanges={this.handleScheduleExamTextFieldsChanges}
                        handleScheduleExamCheckBoxChanges={this.handleScheduleExamCheckBoxChanges}
                        handleScheduleExamScheduleButtonClick={this.handleScheduleExamScheduleButtonClick}
                    />
                );
            case "password-change":
                return(
                    <PasswordChange/>
                );
            default:
                break;
        }
    }

    render() {
        const sidebarProps = {
            openAccountsButton: this.state.openAccountsButton,
            openMarksExamsButton:this.state.openMarksExamsButton,
            staffView: this.state.staffViews,
        }

        const accountsCollapseHandlers = {
            handleClickView: this.handleClickView,
            handleClickCreate: this.handleClickCreate,
            handleClickEdit: this.handleClickEdit,
            handleClickDelete: this.handleClickDelete,
        }

        const marksExamsCollapseHandlers = {
            handleClickScheduleExams: this.handleClickScheduleExams,
            handleClickManageMarks: this.handleClickManageMarks,
        }


        const {classes} = this.props;

        return(

            <div className={classes.root}>
                <CssBaseline />
                <Header className={classes.appBar} />

                <Sidebar classNameDrawer={classes.drawer} 
                  classNameDrawerPaper={classes.drawer}
                  classNameDrawerContainer={classes.drawer}
                  sidebarProps={sidebarProps}
                  handleAccountsButtonClick={this.handleAccountsButtonClick}
                  accountsCollapseHandlers={accountsCollapseHandlers}
                  handleMarksExamsButtonClick={this.handleMarksExamsButtonClick}
                  marksExamsCollapseHandlers={marksExamsCollapseHandlers}
                />
                <Paper className={classes.paperMain}>
                    <Toolbar/>
                    {this.renderStaffViews(this.props.match.params.option)}
                </Paper>
            </div>
        ); 
    }
}

export default withStyles(styles)(Staff);
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
            caError:false,
            caErrorMessage:"",
            openSuccessDBox:false,


          //EdithAccount component props

          //ScheduleExam component props
          examDate: "",
          examLevel: "A1", //default value
          A1Checked: false,
          A2Checked: false,
          B1Checked: false,
          B2Checked: false,
          C1Checked: false,
          seError: false,
          seErrorMessage:"",
          openScheduleExamDBox: false,
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

    clearScheduleExamFormOnScheduleSuccessful = () => {
        this.setState({
            examDate: "",
            A1Checked: false,
            A2Checked: false,
            B1Checked: false,
            B2Checked: false,
            C1Checked: false,
        })
    }


    // Eventhandler for the sidebar component
    handleAccountsButtonClick = () => {

        this.setState((state) => ({
            openAccountsButton: !state.openAccountsButton
        }));
    }

    handleClickView = () => {
        this.setState({staffView: "accounts_view"})
        this.props.history.push('/staffs/accounts/view')  
    }

    handleClickCreate = () => {
        this.setState({staffView: "accounts_create"})
        this.props.history.push('/staffs/accounts/create')
    }

    handleClickEdit = () => {
        this.setState({staffView: "accounts_edit"})
        this.props.history.push('/staffs/accounts/edit')
    }

    handleClickDelete = () => {
        this.setState({staffView: "accounts_delete"})
        this.props.history.push('/staffs/accounts/delete')
    }

    handleClickManageMarks = () => {
        this.setState({staffView: "manage_marks"})
        this.props.history.push('/staffs/marks-exams/manage-marks')
    }

    handleClickScheduleExams = () => {
        this.setState({staffView: "schedule_exams"})
        this.props.history.push('/staffs/marks-exams/schedule-exams')
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

    handleCASuccessDBoxOnClose = () => {
        this.setState({openSuccessDBox: false})
    }

    handleCASuccessDBoxOnButton1Click = () => {
        this.setState({openSuccessDBox: false})
    }

    handleCASuccessDBoxOnButton2Click = () => {
        this.setState({openSuccessDBox: false})
        this.props.history.push('/staffs/accounts/view') 

    }


    handleConfirmButtonClick = () => {

        this.setState({openConfirmationDialog: false,
            accountCreationInProgress: true
        })
        
        
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
                    this.setState({accountCreationSuccess: false, caError: true,
                        caErrorMessage: err.response.body.message, })
                    this.setState({accountCreationInProgress:false})
                }
                else {
                    this.setState({accountCreationSuccess: true, openSuccessDBox: true })
                    this.clearCreateAccountFormOnAccountCreationSuccessful()

                    if(this.state.caError) {
                        this.setState({caError: false, caErrorMessage: "", })
                    }
                    this.setState({accountCreationInProgress:false})
                }
            });

        } else {
            userData.currentLevel = this.state.currentLevel || undefined
            rolesDto.push("ROLE_STUDENT")
            
            const studentDto = userData;
            const studentAccountDataDto = {studentDto, rolesDto}

            request.post('students', studentAccountDataDto, (err, res) => {

                if(err) {
                    
                    this.setState({accountCreationSuccess: false, caError: true,
                        caErrorMessage: err.response.body.message, })
                    this.setState({accountCreationInProgress:false})
                }
                else {
                    this.setState({accountCreationSuccess: true, openSuccessDBox:true})
                    this.clearCreateAccountFormOnAccountCreationSuccessful()

                    if(this.state.caError) {
                        this.setState({caError: false, caErrorMessage: "", })
                    }
                    this.setState({accountCreationInProgress:false})
                }
            });
        }
        
    }

    //Eventhandler for scheduleExam component 
    handleScheduleExamTextFieldsChanges = (stateProp, value) => {
        this.setState({[stateProp]: value})
        if(this.state.seError) {
            this.setState({seError:false,
                seErrorMessage:"" })
        }
    }

    handleScheduleExamCheckBoxChanges = (stateProp, value) => {
        this.setState({[stateProp]: value})
        if(this.state.seError) {
            this.setState({seError:false,
                seErrorMessage:"" })
        }
    }

    handleSEOnDBoxClose = () => {
        this.setState({openScheduleExamDBox: false})
    }

    handleSEDBoxButtonClick = () => {
        this.setState({openScheduleExamDBox: false})
        this.props.history.push('/staffs/accounts/view')
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
                this.setState({seError:true,
                    seErrorMessage:err.response.body.message })
            } else {
                console.log(res)
                this.setState({openScheduleExamDBox: true})
                if(this.state.seError) {
                    this.setState({seError:false,
                        seErrorMessage:"" })
                }
                this.clearScheduleExamFormOnScheduleSuccessful()
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
                    error: this.state.caError,
                    errorMessage: this.state.caErrorMessage,
                    openSuccessDBox: this.state.openSuccessDBox,
                }
                return <CreateAccount 
                            createAccountProps={createAccountProps}
                            handleRadioClick={this.handleRadioClick }
                            handleCheckBoxClick={this.handleCheckBoxClick}
                            handleCreatAccountTextFieldsChanges={this.handleCreatAccountTextFieldsChanges}
                            handleCreateAccountButtonClick={this.handleCreateAccountButtonClick}
                            handleCancelOrCloseDialog={this.handleCancelOrCloseDialog}
                            handleConfirmButtonClick={this.handleConfirmButtonClick }
                            handleCASuccessDBoxOnClose={this.handleCASuccessDBoxOnClose}
                            handleCASuccessDBoxOnButton1Click={this.handleCASuccessDBoxOnButton1Click}
                            handleCASuccessDBoxOnButton2Click={this.handleCASuccessDBoxOnButton2Click}
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
                    error:     this.state.seError,
                    errorMessage: this.state.seErrorMessage,
                    openScheduleExamDBox:this.state.openScheduleExamDBox,
                }
                return(
                    <ScheduleExam
                        scheduleExamProps={scheduleExamProps}
                        handleScheduleExamTextFieldsChanges={this.handleScheduleExamTextFieldsChanges}
                        handleScheduleExamCheckBoxChanges={this.handleScheduleExamCheckBoxChanges}
                        handleScheduleExamScheduleButtonClick={this.handleScheduleExamScheduleButtonClick}
                        handleSEOnDBoxClose={this.handleSEOnDBoxClose}
                        handleSEDBoxButtonClick={this.handleSEDBoxButtonClick}
                    />
                );
            case "password-change":
                return(
                    <PasswordChange redirectDestination='/staffs/accounts/view'/>
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
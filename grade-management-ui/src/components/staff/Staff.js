import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';


import HeaderAndSidebar from   '../header/HeaderAndSidebar'
import OverviewAccounts from   './OverviewAccounts'
import CreateAccount    from   './CreateAccount'
import ScheduleExam     from   './ScheduleExam'
import MarksManagement  from   './MarksManagement'

const request = require('../../resources/request')





class Admin extends React.Component {

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

    

    /*componentDidMount(){
        this.setState({staffView: this.props.match.params.option})
    }*/



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
        if(!this.state.accountCreationInProgress) {
            this.setState({accountCreationInProgress: true})
        }
        
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

            console.log("representation of the staffAccountDataDto => \n " + staffAccountDataDto )
            
            
            request.post('staffs',staffAccountDataDto, (err, res) => {
                
                if(err) {
                    console.log("Error_Staff_Account_Creation: the api post request, reported an error! \n See error response below: ")
                    //console.log(err)
                    this.setState({accountCreationSuccess: false})
                    this.setState({accountCreationInProgress: false})
                }
                else {
                    console.log("Success: the api post request was successful! \n See success response below")
                    console.log(res)
                    this.setState({accountCreationSuccess: true})
                    this.setState({accountCreationInProgress: false})
                }
            });

        } else {
            userData.currentLevel = this.state.currentLevel || undefined
            rolesDto.push("ROLE_STUDENT")
            
            const studentDto = userData;
            const studentAccountDataDto = {studentDto, rolesDto}
            console.log("representation of the studentAccountDataDto => \n " + JSON.stringify(studentAccountDataDto) )

            request.post('students', studentAccountDataDto, (err, res) => {

                if(err) {
                    console.log("Error_Student_Account_Creation: the api post request, reported an error! \n See error response below: ")
                    //console.log(err)
                    this.setState({accountCreationSuccess: false})
                    this.setState({accountCreationInProgress: false})
                }
                else {
                    console.log("Success: the api post request was successful! \n See success response below")
                    console.log(res)
                    this.setState({accountCreationSuccess: true})
                    this.setState({accountCreationInProgress: false})
                }
            });
        }
    }

    //Eventhandler for scheduleExam component 
    handleScheduleExamTextFieldsChanges = (stateProp, value) => {
        this.setState({[stateProp]: value})
    }

    handleScheduleExamScheduleButtonClick = () => {
        const examDto = {
            examLevel: this.state.examLevel || undefined,
            examDate: this.state.examDate || undefined,
        }

        request.post('exams', examDto, (err, res) => {

            if(err) {
                console.log("The Exam could not be scheduled \n More details below ")
                //console.log(err)
            } else {
                console.log("The Exam was successfully schedule !!!")
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
                }
                return(
                    <ScheduleExam
                        scheduleExamProps={scheduleExamProps}
                        handleScheduleExamTextFieldsChanges={this.handleScheduleExamTextFieldsChanges}
                        handleScheduleExamScheduleButtonClick={this.handleScheduleExamScheduleButtonClick}
                    />
                );
            default:
                break;
        }
    }

    render() {
        console.log(`the value of the <<option>> param is => ${this.props.match.params.option}`)
        console.log(`the value of the <<menu>> param is => ${this.props.match.params.menu}`)
        console.log("The value of the sidebar state is:" + JSON.stringify(this.state));

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


        return(
            <div>
                <HeaderAndSidebar pageBody={this.renderStaffViews(this.props.match.params.option)}
                                  sidebarProps={sidebarProps}
                                  handleAccountsButtonClick={this.handleAccountsButtonClick}
                                  accountsCollapseHandlers={accountsCollapseHandlers}
                                  handleMarksExamsButtonClick={this.handleMarksExamsButtonClick}
                                  marksExamsCollapseHandlers={marksExamsCollapseHandlers}
                />
            </div>
        ); 
    }
}

export default Admin;
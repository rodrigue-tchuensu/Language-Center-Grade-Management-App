import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import {ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import {Button,Collapse,} from '@material-ui/core';
import {AssessmentTwoTone,StraightenTwoTone, AccountBoxTwoTone, PeopleTwoTone,DashboardTwoTone,
        PersonAddTwoTone,  ExpandLess, ExpandMore, EditTwoTone, DeleteTwoTone, CalendarTodayTwoTone} from '@material-ui/icons';

const request = require ('../../resources/request');


        const drawerWidth = 240;

        const styles = theme => ({
          nested: {
            paddingLeft: theme.spacing(4),
          },
        });

       
class Sidebar extends React.Component {

    render() {
        
        const {classes} = this.props;
        
        const userDetail = request.auth.getAvailableUserDetails()

        return(
            <Drawer
                className={this.props.classNameDrawer}
                variant="permanent"
                classes={{
                paper: this.props.classNameDrawerPaper,
                }}
            >
                <Toolbar />
                <div className={this.props.classNameDrawerContainer}>
                <List>
                    {false && (<ListItem key='dashboard'>
                        <Button
                            startIcon={<DashboardTwoTone/>} 
                        > 
                            Dashboard
                        </Button>
                    </ListItem>)}
                    <ListItem key='manage' >
                        <Button
                            startIcon={<AccountBoxTwoTone/>} 
                            onClick={this.props.handleAccountsButtonClick}
                            endIcon={this.props.sidebarProps.openAccountsButton ? <ExpandLess /> : <ExpandMore />}
                        > 
                            Accounts
                        </Button>
                        
                    </ListItem>
                    <Collapse in={this.props.sidebarProps.openAccountsButton} timeout="auto" unmountOnExit>
                        <List className={classes.nested}>
                            
                            <ListItem key="view" button onClick={this.props.accountsCollapseHandlers.handleClickView}>
                                <ListItemIcon>
                                    <PeopleTwoTone/>
                                </ListItemIcon>
                                <ListItemText primary='View'/>
                            </ListItem>

                            { userDetail.roles.indexOf("ROLE_STAFF_ADMIN") > -1 ?
                                (<ListItem key="create-account" button onClick={this.props.accountsCollapseHandlers.handleClickCreate}>
                                    <ListItemIcon>
                                        <PersonAddTwoTone/>
                                    </ListItemIcon>
                                    <ListItemText primary='Create'/>
                                </ListItem>) : null
                            }

                            {false && (<ListItem>
                                <ListItemIcon>
                                   <EditTwoTone/>
                                </ListItemIcon>
                                <ListItemText primary='Edit'/>
                            </ListItem>)}

                            {false && (<ListItem>
                                <ListItemIcon>
                                    <DeleteTwoTone/>
                                </ListItemIcon>
                                <ListItemText primary='Delete'/>
                            </ListItem>)}

                        </List>
                    </Collapse> 
                    <ListItem key='marks'>
                        <Button
                            startIcon={<AssessmentTwoTone/>} 
                            onClick={this.props.handleMarksExamsButtonClick}
                            endIcon={this.props.sidebarProps.openMarksExamsButton ? <ExpandLess /> : <ExpandMore />}
                        > 
                            Marks/Exams
                        </Button>
                    </ListItem> 
                    <Collapse in={this.props.sidebarProps.openMarksExamsButton} timeout="auto" unmountOnExit>
                        <List className={classes.nested}>

                            <ListItem key="manageMarks" button onClick={this.props.marksExamsCollapseHandlers.handleClickManageMarks}>
                                <ListItemIcon>
                                    <StraightenTwoTone/>
                                </ListItemIcon>
                                <ListItemText primary='Manage Marks'/>
                            </ListItem>

                            { userDetail.roles.indexOf("ROLE_STAFF_MANAGER") > -1 ?
                                (<ListItem key="ScheduleExam" button onClick={this.props.marksExamsCollapseHandlers.handleClickScheduleExams}>
                                    <ListItemIcon>
                                        <CalendarTodayTwoTone/>
                                    </ListItemIcon>
                                    <ListItemText primary='Schedule Exam'/>
                                </ListItem>) : null
                            }

                        </List>
                    </Collapse>              
                </List>
                </div>
            </Drawer>
        );
    }
}

export default withStyles(styles)(Sidebar)
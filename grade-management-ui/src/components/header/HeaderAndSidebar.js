
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {Paper} from '@material-ui/core';

import Header from './../header/Header'

import Sidebar from '../sidebar/Sidebar'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
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
    maxHeight: 'auto',
    minHeight: 730,
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

class HeaderAndSidebar extends React.Component {
  
  /*
  constructor(props) {
      super(props);
      this.state = {
          open: true,
          setOpen: true,
      };
  }

  handleClickManageUser = () => {
      this.setState((state) => ({
          open: !state.open
      }));
  };
  */
    render() {
    const {classes} = this.props;
    //console.log("HEADER-SIDER COMPONENT: the value of the sidebarProp is: " + JSON.stringify(this.props.sidebarProps))
    //console.log("HEADER-SIDER COMPONENT: the value of the sidebarProp.open is: " +  this.props.sidebarProps.open)
    return (
        <div className={classes.root}>
          <CssBaseline />
          <Header className={classes.appBar} />

          <Sidebar classNameDrawer={classes.drawer} 
                  classNameDrawerPaper={classes.drawer}
                  classNameDrawerContainer={classes.drawer}
                  sidebarProps={this.props.sidebarProps}
                  handleAccountsButtonClick={this.props.handleAccountsButtonClick}
                  accountsCollapseHandlers={this.props.accountsCollapseHandlers}
                  handleMarksExamsButtonClick={this.props.handleMarksExamsButtonClick}
                  marksExamsCollapseHandlers={this.props.marksExamsCollapseHandlers}
          />
          <Paper className={classes.paperMain}>
            <Toolbar/>

            {this.props.pageBody}

          </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(HeaderAndSidebar)
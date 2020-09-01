import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, Typography, Box, CircularProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    progess: {
      margin:theme.spacing(10, 10, 10, 10)
    },
    div:{
      margin:theme.spacing(10)
    },
  }));
  function EnhancedCircularProgressWithLabel(props) {
    const classes = useStyles();
    return (
      <Box position="relative" display="inline-flex" className={classes.progess}>
        <CircularProgress variant='indeterminate'  size={props.size} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography color="primary"><b>{props.label}</b></Typography>
        </Box>
      </Box>
    );
  }


  export default function CircularProgressWithLabel(props) {
    const classes = useStyles();
    return(
      <div className={classes.div}>
        <Dialog
          open={props.open}
          maxWidth='sm'
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <DialogContent>
            <EnhancedCircularProgressWithLabel label={props.label} size={props.size}/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

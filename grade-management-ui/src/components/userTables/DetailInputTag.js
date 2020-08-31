import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
    },
    label:{
        textAlign: 'center',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(5),
        marginLeft: theme.spacing(1),
    },
}));


export default function DetailInputTag(props) {

    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Typography 
                    className={classes.label}
                    variant= 'subtitle1'
                    color= 'inherit'
                    display= 'inline'
            >
                {props.labelName}  
            </Typography>
            <Typography display= 'inline' variant= 'body2'>{props.inputValue} </Typography>
            
        </div>
    )
}
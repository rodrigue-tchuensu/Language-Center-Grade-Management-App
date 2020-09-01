import React from 'react';
import {Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { Button } from '@material-ui/core';



export default function DialogBox(props) {
    
    return(
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.contentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {(props.btn2IsVisible !== undefined)&&(props.btn2IsVisible) ? (<Button onClick={props.onButton2Click} color="primary">{props.btn2Name}</Button>) : null}
                <Button onClick={props.onButton1Click} color="primary" autoFocus >{props.btn1Name}</Button>
            </DialogActions>
        </Dialog>
    )
}
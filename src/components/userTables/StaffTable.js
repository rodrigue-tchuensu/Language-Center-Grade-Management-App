import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Button,} from '@material-ui/core';
import {Dialog,DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import DetailInputTag from './DetailInputTag';

const request = require ('../../resources/request');

class StaffTable extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            data: [],
            detailData:{},
            showDetails: false,
        }
    }

    componentDidMount = () => this.fetchData()
    
    //componentDidUpdate = () => this.fetchData()

    fetchData = () => {
        request.get('staffs/limitedInfos', (err, res) => {

            if(err){
                
            }
            else {
                this.setState({data: res.body})
            }
        })
    }

    handleCloseDialog = () => {
        this.setState({showDetails: false}) 
    }



    render() {
        
        const tableTitle = this.props.tableTitle;

        return (
            
            <>
                <MaterialTable
                    title={tableTitle}
                    columns={[
                        {title: 'Staff No.', field: 'staffNumber'},
                        {title: 'Name', field: 'name'},
                        {title: 'Date of Birth', field: 'dateOfBirth'},
                    ]}
                    data= {this.state.data.map((staff) => (
                            {staffNumber: staff.staffNumber,
                            name:  staff.fullname ,
                            dateOfBirth: staff.dateOfBirth,
                            }
                        ))}

                    actions= {[
                        {
                            icon: 'emoji_people',
                            tooltip: 'More details ...',
                            onClick: (event, rowData) => {
                                
                                request.get('staffs/' + rowData.staffNumber, (err, res) => {

                                    if(err) {
                                        
                                    }
                                    else {
                                        
                                        this.setState({ detailData: res.body, showDetails: true})
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

                <Dialog open={this.state.showDetails}
                        onClose={this.handleCloseDialog}
                >
                    <DialogTitle id="more-info-dialog-title">Staff Detail Information</DialogTitle>
                    <DialogContent>
                        
                            <DetailInputTag labelName="Staff Number:" inputValue={this.state.detailData.staffNumber}/>
                            <DetailInputTag labelName="First Name:" inputValue={this.state.detailData.firstname}></DetailInputTag>
                            <DetailInputTag labelName="Last Name:" inputValue={this.state.detailData.lastname}/>
                            <DetailInputTag labelName="Date of Birth:" inputValue={this.state.detailData.dateOfBirth}/>
                            <DetailInputTag labelName="Phone Number:" inputValue={this.state.detailData.phoneNumber}/>
                            <DetailInputTag labelName="Email:" inputValue={this.state.detailData.email}/>
                            <DetailInputTag labelName="Office Phone Number:" inputValue={this.state.detailData.officePhoneNumber}/>
                            <DetailInputTag labelName="Office Number:" inputValue={this.state.detailData.officeNumber}/>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleCloseDialog} >Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }  
}
export default StaffTable;
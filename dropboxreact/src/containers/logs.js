import React, { Component } from 'react';
import styles from './style.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getActivity} from '../actions/getActivityAction';
import * as API from '../api/API';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import LogoutAvtar from 'material-ui/svg-icons/action/exit-to-app';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import DriveFolder from 'material-ui/svg-icons/file/folder-open';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import StarBlank from 'material-ui/svg-icons/toggle/star-border';
import StarShaded from 'material-ui/svg-icons/toggle/star'; 
import FileDownload from 'material-ui/svg-icons/file/file-download';
import FileDelete from 'material-ui/svg-icons/action/delete';
import Share from 'material-ui/svg-icons/social/share';
import Divider from 'material-ui/Divider';
import {
  blue500,
  grey200,
  red300,
  indigo900,
  orange800,
  deepOrange300,
  pink400,
  purple500,
  green300,
  yellow50,
  fullWhite,
  grey100,
}from 'material-ui/styles/colors';

class Logs extends React.Component{

    getActivityCall(userid){
        API.getActivity(userid)
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    //console.log("got this: "+data);
                    this.props.getActivity(data);
                });
                
            } else if (res.status === 401) {
                console.log("Fail");
            }
        });    
    }

    componentWillMount(){
        
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 202) {
                    this.props.history.push("/login");
                }
        });
        this.getActivityCall({userid:this.props.activeUserData.loginData.userid});
    }

    createActivityList = () => {
        return this.props.activity.map(activity =>{
            return(
                <div>
                    
                    <div className="row">
                    
                        <div className="col-md-4">
        
                            <ListItem>

                                <div className="row">
                                    <div className="col-md-3">

                                    {activity.type==="folder" &&    
                                        <Avatar
                                            icon={<DriveFolder />}
                                            color={blue500}
                                            backgroundColor={grey100}
                                            
                                        />
                                    }
                                    {activity.type==="file" &&    
                                        <Avatar
                                            icon={<DriveFile />}
                                            color={blue500}
                                            backgroundColor={grey100}
                                            
                                        />
                                    }
                                    </div>
                                    <div className="col-md-6" style={{marginTop:"13px"}}>
                                        {activity.name}
                                    </div>
                                </div>
                            </ListItem>
                        </div>
                        
                        <div className="col-md-4">
                            <ListItem disabled={true}>
                                <div className="row" style={{marginTop:"13px"}}>
                                    
                                    {activity.activitytype}
                                
                                </div>
                            </ListItem>
                        </div>

                        <div className="col-md-4">
                            <ListItem disabled={true}>
                                <div className="row" style={{marginTop:"13px"}}>
                                    
                                    {activity.date}
                                
                                </div>
                            </ListItem>
                        </div>
                        <Divider style={{marginLeft:"13px"}}/>
                    </div>
                  
                </div>

        );

        });
    }
    

    render(){
        return(
            <div>
                <div className="row" style={styles.accountMargin}>
                    <h1>Home</h1>
                </div>
                <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>

                <MuiThemeProvider>
                <div>
                    <div className="row">
                        
                            <div className="col-md-4">
            
                                <ListItem disabled={true}>

                                    <div className="row">
                                        <div className="col-md-6 col-md-offset-2" style={{marginTop:"13px"}}>
                                            Name
                                        </div>
                                    </div>
                                </ListItem>
                            </div>
                            
                            <div className="col-md-4">
                                <ListItem disabled={true}>
                                    <div className="row" style={{marginTop:"13px"}}>
                                        
                                        Description
                                    
                                    </div>
                                </ListItem>
                            </div>

                            <div className="col-md-4">
                                <ListItem disabled={true}>
                                    <div className="row" style={{marginTop:"13px",marginLeft:"1px"}}>
                                        
                                        Date
                                    
                                    </div>
                                </ListItem>
                            </div>
                            
                    </div>          
                </div>  
                </MuiThemeProvider>
                    
                    <div className="row">
                        
                            <MuiThemeProvider>
                                <div>
                                    {this.createActivityList()}
                                </div>
                            </MuiThemeProvider>
                        
                    </div>
            </div>
        );
    }
}



function mapStateToProps(state){
    return{
        activeUserData:state.activeUserData,
        activity:state.activity
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            getActivity,


        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Logs);
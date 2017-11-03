import React, { Component } from 'react';
import styles from './style.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {createFolder} from '../actions/createFolderAction';
import {createFolderDone} from '../actions/createFolderAction';
import {createFolderNameChange} from '../actions/createFolderAction';
import {getFolders} from '../actions/getFoldersAction';

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
import TextField from 'material-ui/TextField';
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


} from 'material-ui/styles/colors';

class CreateFolder extends React.Component{

    getFoldersCall(requestData){
        API.getFolders(requestData)
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    //console.log("got this: "+data);
                    this.props.getFolders(data);
                });
                
            } else if (res.status === 401) {
                console.log("Fail");
            }
        });    
    }

    createFolder(){
        var foldername=this.props.foldername;
        if(foldername.length<=0){
            NotificationManager.error( "Please enter folder name","Folder creation Failed", 2500, true);
        }
        else{
            this.props.createFolderDone();
            var requestData={path:this.props.path,userid:this.props.activeUserData.loginData.userid};
            var payload={userid:this.props.activeUserData.loginData.userid,path:this.props.path,foldername:this.props.foldername};
            API.createFolder(payload)
            .then((res) => {
                if (res.status === 201) {
                    this.getFoldersCall(requestData);
                }
                else if(res.status === 202){
                    console.log("Fail");
                    NotificationManager.error( "Folder creation failed","Folder exists", 2500, true);
                }
            });
        }
        
    }

    exitCreateFolder(){
        this.props.createFolderDone();
    }

    render(){
        return(
            <div>
                <MuiThemeProvider>
                
                    <div className="row">
                    
                        <Divider style={{marginLeft:"13px", marginTop:"5px"}}/>
                        <div className="col-md-7">

                            <div className="col-md-6">
                                <ListItem disabled={true}>

                                    <div className="row">
                                        <div className="col-md-2" style={{marginTop:"15px"}}>
                                        
                                            <Avatar
                                                icon={<DriveFolder />}
                                                color={blue500}
                                                backgroundColor={grey100}      
                                            />
                                            
                                        </div>
                                        
                                        <div className="col-md-6" style={{marginTop:"13px"}}>
                                            <TextField hintText="Folder name" style={styles.mLeft} name="foldername"
                                                onChange={(event)=>
                                                {event.persist();
                                                this.props.createFolderNameChange(event);
                                                }}
                                            />
                                        </div>
                                        
                                    </div>
                                </ListItem>
                            </div>

                            
                        </div>
                        <div className="col-md-5">
                            <ListItem disabled={true} style={{marginTop:"13px"}}>

                                <RaisedButton label="Create Folder"  backgroundColor={green300}
                                    onClick={()=> this.createFolder()}  
                                />
                                <RaisedButton label="Cancel" backgroundColor={red300}
                                    onClick={()=> this.exitCreateFolder()}  
                                />
                            </ListItem>
                        </div>
                        
                    </div>
                </MuiThemeProvider>
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        activeUserData:state.activeUserData,
        path:state.path,
        foldername:state.createFolder.name,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            createFolderDone,
            createFolderNameChange,
            getFolders,

        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(CreateFolder);
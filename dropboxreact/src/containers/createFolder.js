import React, { Component } from 'react';
import styles from './style.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {createFolder} from '../actions/createFolderAction';
import {createFolderDone} from '../actions/createFolderAction';
import {createFolderNameChange} from '../actions/createFolderAction';
import {getFolders} from '../actions/getFoldersAction';

import * as API from '../api/API';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import {
    red500,
    green400,
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
        this.props.createFolderDone();
        var requestData={path:this.props.path,userid:this.props.activeUserData.loginData.userid};
        var payload={userid:this.props.activeUserData.loginData.userid,path:this.props.path,foldername:this.props.foldername};
        API.createFolder(payload)
        .then((res) => {
            if (res.status === 201) {
                this.getFoldersCall(requestData);
            }
        });
    }

    exitCreateFolder(){
        this.props.createFolderDone();
    }

    render(){
        return(
            <div>
                <MuiThemeProvider>
                    <div className="row">
                        <div className="col-md-4">
                            <TextField hintText="Folder name" style={styles.mLeft} name="foldername"
                                onChange={(event)=>
                                {event.persist();
                                this.props.createFolderNameChange(event);
                                }}
                            />
                        </div>
                        <div className="col-md-5">
                            <RaisedButton label="Create Folder"  backgroundColor={green400}
                                onClick={()=> this.createFolder()}  
                            />
                            <RaisedButton label="Cancel" backgroundColor={red500}
                                onClick={()=> this.exitCreateFolder()}  
                            />
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
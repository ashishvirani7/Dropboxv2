import React, { Component } from 'react';
import {persistStore, autoRehydrate} from 'redux-persist'
import PropTypes from 'prop-types';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Dropzone from 'react-dropzone';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from '../actions/logoutAction';
import {getFiles} from '../actions/getFilesAction';
import styles from './style.css';
import store from '../index';
import * as API from '../api/API';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import LogoutAvtar from 'material-ui/svg-icons/action/exit-to-app';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import {
  blue500,
  indigo900,
  orange800,
  deepOrange300,
  pink400,
  purple500,
  green700,
  yellow50,

} from 'material-ui/styles/colors';

class CommonHome extends React.Component{

    getFilesCall(){
        var requestData={path:this.props.path,userid:this.props.activeUserData.loginData.userid};
        API.getFiles(requestData)
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    //console.log("got this: "+data);
                    this.props.getFiles(data);
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
        this.getFilesCall();
    }    

    handleLogout(){
        this.props.logout();
        API.doLogout(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 201) {
                persistStore(store).purge();
                NotificationManager.info( "Logout Successful","Bye", 2500, true);
                this.props.history.push("/login");
            }
        });
    }
    onDrop =  (acceptedFiles) => {
        const payload = new FormData();
        
        acceptedFiles.forEach(file => {
            payload.append('myfile', file);
            
        });

        payload.append('userid',this.props.activeUserData.loginData.userid);
        payload.append('path',this.props.path);
        
        API.fileUpload(payload)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                this.getFilesCall();
                
            } else if (res.status === 401) {
                console.log("Fail");
            }  
        });
    }

    onFileClick = (fileid) => {
        console.log("file id : "+fileid);
        API.fileDownload()
        .then(res =>{

        });
    };

    createFileList() {
        
        return this.props.files.map((file) => {
            console.log("ITEM:"+file.name);
            return(
                <ListItem
                    key = {file.fileid}
                    disabled={false}
                    size={50}
                    onClick={()=>this.onFileClick(file.fileid)}
                    leftAvatar={
                    <Avatar
                        icon={<DriveFile />}
                        color={yellow50}
                        backgroundColor={blue500}
                        size={40}
                        style={{marginLeft: 10}}
                        
                    />
                    }><p style={{marginLeft:10}}>
                        {file.name}</p>
                        <RaisedButton label="Delete" primary={true}
                        />
                </ListItem>
            );   
        });
        
    }

    render(){
        const overlayStyle = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            padding: '2.5em 0',
            background: 'rgba(0,0,0,0)',
            height:"100vh",
            color: '#fff'}

            if(!this.props.files)
                return(<div></div>);
            else{
                return(
                    
                    <div className="row">
                        <div className="row" style={styles.accountMargin}>
                            <h1>Home</h1>
                        </div>
                        <Dropzone 
                            onDrop={this.onDrop.bind(this)} 
                            style={overlayStyle}
                            disableClick
                            >
                            <MuiThemeProvider>
                                <ListItem> 
                                    {this.createFileList()}
                                </ListItem>
                            
                            </MuiThemeProvider>
                        
                        </Dropzone>
                    </div>
                    
                );
            }
    }
}

function mapStateToProps(state){
    return{
        activeUserData:state.activeUserData,
        path:state.path,
        files:state.files,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            logout,
            getFiles
        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(CommonHome);
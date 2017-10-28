import React, { Component } from 'react';
import {persistStore, autoRehydrate} from 'redux-persist'
import PropTypes from 'prop-types';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Dropzone from 'react-dropzone';
import fileDownload from 'js-file-download';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from '../actions/logoutAction';
import {getFiles} from '../actions/getFilesAction';
import {getFolders} from '../actions/getFoldersAction';
import styles from './style.css';
import store from '../index';
import * as API from '../api/API';
import CreateFolder from './createFolder';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import LogoutAvtar from 'material-ui/svg-icons/action/exit-to-app';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import DriveFolder from 'material-ui/svg-icons/file/folder-open';
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
var requestData;


class CommonHome extends React.Component{

    getFilesCall(){
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

    getFoldersCall(){
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

    componentWillMount(){
        requestData={path:this.props.path,userid:this.props.activeUserData.loginData.userid};
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 202) {
                    this.props.history.push("/login");
                }
        });
        
        this.getFilesCall();
        this.getFoldersCall();
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

    onFileClick = (fileid,name) => {
        console.log("file id : "+fileid);
        API.fileDownload(fileid)
        .then(res =>{
            console.log(res);
            fileDownload(res.data, name);
        });

    };

    onFolderClick = (folderid,name) => {
        console.log("folder id : "+folderid);
        this.props.history.push();
    };

    deleteFile = (fileid,userid) => {
        API.deleteFile({fileid,userid})
        .then(res =>{
            if(res.status===201){
                this.getFilesCall();
            }
        });
    };

    deleteFolder = (folderid,userid) => {
        API.deleteFolder({folderid,userid})
        .then(res =>{
            if(res.status===201){
                this.getFoldersCall();
            }
        });
    };


    createFileList() {
       
        console.log("files: "+Object.keys(this.props.files).length)
        return this.props.files.map((file) => {
            console.log("ITEM:"+file.name);
            return(
                <div>
                    <ListItem
                        key = {file.fileid}
                        disabled={false}
                        size={50}
                        onClick={()=>this.onFileClick(file.fileid,file.name)}
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
                            
                    </ListItem>
                    <RaisedButton label="Delete" primary={true} style={styles.mLeft}
                        onClick={()=>this.deleteFile(file.fileid,this.props.activeUserData.loginData.userid)}
                    />
                </div>
            );   
        });
        
    }

    createFolderList() {
    
        //console.log("files: "+Object.keys(this.props.files).length)
        return this.props.folders.map((folder) => {
            return(
                <div>
                    <ListItem
                        key = {folder.folderid}
                        disabled={false}
                        size={50}
                        //onClick={()=>this.onFileClick(file.fileid,file.name)}
                        leftAvatar={
                        <Avatar
                            icon={<DriveFolder />}
                            color={yellow50}
                            backgroundColor={blue500}
                            size={40}
                            style={{marginLeft: 10}}
                            
                        />
                        }><p style={{marginLeft:10}}>
                            {folder.name}</p>
                    </ListItem>
                    <RaisedButton label="Delete" primary={true} style={styles.mLeft}
                        onClick={()=>this.deleteFolder(folder.folderid,this.props.activeUserData.loginData.userid)}
                    />
                </div>
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
                        {this.props.createFolder.create && <CreateFolder/>}
                        <MuiThemeProvider>
                            <ListItem>
                                {this.createFolderList()}
                                {this.createFileList()}
                            </ListItem>
                        </MuiThemeProvider>
                    
                    </Dropzone>
                </div>
                
            );
            
    }
}

function mapStateToProps(state){
    return{
        activeUserData:state.activeUserData,
        path:state.path,
        files:state.files,
        createFolder:state.createFolder,
        folders:state.folders,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            logout,
            getFiles,
            getFolders,
        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(CommonHome);
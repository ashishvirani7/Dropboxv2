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
import {folderClick} from '../actions/folderClickAction';
import {createFolderDone} from '../actions/createFolderAction';
import {setPath} from '../actions/pathAction.js';
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
  grey200,
  red400,
  indigo900,
  orange800,
  deepOrange300,
  pink400,
  purple500,
  green700,
  yellow50,
  fullWhite,

} from 'material-ui/styles/colors';
var requestData;
var currentpath;

class CommonHome extends React.Component{

    onBackButtonEvent= (e) => {
        e.preventDefault();
        currentpath = this.props.location.pathname;
        var length= currentpath.length;
        if(currentpath[length-1]==="/"){
            currentpath=currentpath.slice(0,-1);
        }
        this.props.setPath(currentpath);
        this.props.history.push(currentpath);
        window.location.reload();
    };
    componentDidMount() {
        window.onpopstate = this.onBackButtonEvent;
    }

    getFilesCall(requestData){
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

    getFoldersCall(requestData){
        API.getFolders(requestData)
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    //console.log("got this: "+data);
                    this.props.getFolders(data);
                });
                
            }else if (res.status === 401) {
                console.log("Fail");
            }
        });    
    }

    componentWillMount(){
        currentpath = this.props.location.pathname;
        console.log("length: "+currentpath[currentpath.length-1]);
        var length= currentpath.length;
        if(currentpath[length-1]==="/"){
            console.log("yo");
            currentpath=currentpath.slice(0,-1);
        }
        console.log("path :"+currentpath);
        this.props.setPath(currentpath);
        requestData={path:currentpath+"/",userid:this.props.activeUserData.loginData.userid};
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 202) {
                    this.props.history.push("/login");
                }
        });
        this.getFilesCall(requestData);
        this.getFoldersCall(requestData);
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
                
                this.getFilesCall(requestData);
                
            } else if (res.status === 202) {
                console.log("Fail");
                NotificationManager.error( "File upload failed","File exists", 2500, true);
            }  
        });
    }

    onFileClick = (fileid,name,userid) => {
        console.log("file id : "+fileid);
        API.fileDownload({fileid,name,userid})
        .then(res =>{
            console.log(res);
            res.json().then(data => {
                fileDownload(Buffer.from(data.file), name);
            });
            
        });

    };

    onFolderClick = (folderid,name) => {
        console.log("folder id : "+folderid);
        //this.getFilesCall({path:this.props.location.pathname+name,userid:this.props.activeUserData.loginData.userid});
        console.log(this.props.path);
        this.props.history.push(this.props.path+name);
        this.getFilesCall({path:this.props.path+name+"/",userid:this.props.activeUserData.loginData.userid});
        this.getFoldersCall({path:this.props.path+name+"/",userid:this.props.activeUserData.loginData.userid});
        this.props.folderClick(name);
        //window.location.reload();
        //console.log("this is something: "+this.props.location.pathname);
    };

    deleteFile = (fileid,userid) => {
        API.deleteFile({fileid,userid})
        .then(res =>{
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    };

    deleteFolder = (folderid,userid) => {
        API.deleteFolder({folderid,userid})
        .then(res =>{
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    };


    createFileList() {
       
        //console.log("files: "+Object.keys(this.props.files).length)
        return this.props.files.map((file) => {
            return(
                <div>
                    <ListItem
                        key = {file.fileid}
                        disabled={false}
                        size={50}
                        onClick={()=>this.onFileClick(file.fileid,file.name,this.props.activeUserData.loginData.userid)}
                        leftAvatar={
                        <Avatar
                            icon={<DriveFile />}
                            color={blue500}
                            backgroundColor={grey200}
                            size={40}
                            style={{marginLeft: 10}}
                            
                        />
                        }><p style={{marginLeft:10}}>
                            {file.name}</p>
                            
                    </ListItem>
                    <RaisedButton label="Delete" style={styles.mLeft} backgroundColor={red400}
                        onClick={()=>this.deleteFile(file.fileid,this.props.activeUserData.loginData.userid)}
                    />
                    <RaisedButton label="Download" style={styles.mLeft} backgroundColor={green700}
                        onClick={()=>this.onFileClick(file.fileid,file.name,this.props.activeUserData.loginData.userid)}
                    />
                    <hr style={{borderWidth:"1px"}}/>
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
                        onClick={()=>this.onFolderClick(folder.folderid,folder.name)}
                        leftAvatar={
                        <Avatar
                            icon={<DriveFolder />}
                            color={blue500}
                            backgroundColor={grey200}
                            size={40}
                            style={{marginLeft: 10}}
                            
                        />
                        }><div className="row"><p style={{marginLeft:10}}>
                            {folder.name}</p>
                            </div>
                    </ListItem>
                    <RaisedButton label="Delete" style={styles.mLeft} backgroundColor={red400}
                        onClick={()=>this.deleteFolder(folder.folderid,this.props.activeUserData.loginData.userid)}
                    />
                    <hr style={{borderWidth:"1px"}}/>
                </div>
            );   
        });
    
    }

    exitCreateFolder(){
        this.props.createFolderDone();
    }

    render(){
        
        console.log("Hey Im called");
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
                        <h1>Dropbox</h1>
                    </div>
                    <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>
                    <Dropzone 
                        onDrop={this.onDrop.bind(this)} 
                        style={overlayStyle}
                        disableClick
                        > 
                        {this.props.createFolder.create && <CreateFolder/>}
                        <MuiThemeProvider>
                            <div>
                                {this.createFolderList()}
                                {this.createFileList()}
                            </div>
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
            folderClick,
            setPath,
            createFolderDone,

        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(CommonHome);
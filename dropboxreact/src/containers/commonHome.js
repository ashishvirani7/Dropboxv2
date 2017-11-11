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
import {share} from '../actions/shareAction';
import {shareDone} from '../actions/shareAction';
import styles from './style.css';
import store from '../index';
import * as API from '../api/API';
import CreateFolder from './createFolder';
import ShareModal from './shareModal';

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
        this.props.createFolderDone();
        
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
                
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                
            } else if (res.status === 202) {
                console.log("Fail");
                NotificationManager.error( "File upload failed","File exists", 2500, true);
            }  
        });
    }

    onFileClick = (fileid,name,userid) => {
        this.props.createFolderDone();
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
        this.props.createFolderDone();
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

    deleteFile = (fileid,userid,type) => {
        this.props.createFolderDone();
        API.deleteFile({fileid,userid,type})
        .then(res =>{
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    };

    deleteFolder = (folderid,userid,type) => {
        this.props.createFolderDone();
        API.deleteFolder({folderid,userid,type})
        .then(res =>{
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    };

    onStarFileClick = (fileid) => {
        this.props.createFolderDone();
        API.starFile({fileid})
        .then(res => {
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    }

    onUnStarFileClick = (fileid) => {
        this.props.createFolderDone();
        API.unStarFile({fileid})
        .then(res => {
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    }

    onStarFolderClick = (folderid) => {
        this.props.createFolderDone();
        API.starFolder({folderid})
        .then(res => {
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    }

    onUnStarFolderClick = (folderid) => {
        this.props.createFolderDone();
        API.unStarFolder({folderid})
        .then(res => {
            if(res.status===201){
                this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
                this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
            }
        });
    }

    onShareClick = (content,type,userid) => {
        this.props.createFolderDone();
        this.props.share({content,type,userid});
        // API.fileShare({fileid})
        // .then(res => {
        //     if(res.status===201){
        //         this.getFilesCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
        //         this.getFoldersCall({path:this.props.path,userid:this.props.activeUserData.loginData.userid});
        //     }
        // });
    }
    
    

    createFileList() {
       
        //console.log("files: "+Object.keys(this.props.files).length)
        return this.props.files.map((file) => {
            return(
                
                    <div className="row">
                        
                        <div className="col-md-9">
                            <div className="col-md-6">
                                <ListItem
                                    key = {file.fileid}
                                    disabled={true}
                                    size={50} >
                                    <div className="row">
                                        <div className="col-md-3">
                                        <Avatar
                                            icon={<DriveFile />}
                                            color={blue500}
                                            backgroundColor={grey100}
                                            
                                        />
                                        </div>
                                        <div className="col-md-6" style={{marginTop:"13px"}}>
                                            {file.name}
                                        </div>
                                    </div>
                                </ListItem>
                            </div>
                            <div className="col-md-2">
                                <ListItem disabled={true}>
                                {!file.starred &&<IconButton iconStyle={styles.iconStyles.verySmallIcon} tooltip="Star"
                                    onClick={()=> this.onStarFileClick(file.fileid)}>
                            
                                    <StarBlank backgroundColor={fullWhite} color={blue500}
                                        style={styles.iconStyles.verySmall} 
                                        onClick={()=> this.onStarFileClick(file.fileid)}/>
                                </IconButton>}
                                {file.starred &&<IconButton iconStyle={styles.iconStyles.verySmallIcon} tooltip="Remove From Star"
                                    onClick={()=> this.onUnStarFileClick(file.fileid)}>
                            
                                <StarShaded backgroundColor={fullWhite} color={blue500}
                                        style={styles.iconStyles.verySmall} 
                                        onClick={()=> this.onUnStarFileClick(file.fileid)}/>
                                </IconButton>}
                                </ListItem>
                            </div>
                            <div className="col-md-4">
                                <ListItem disabled={true}>
                                    <div className="row" style={{marginTop:"13px"}}>
                                        
                                        {file.dateUploaded}
                                    
                                    </div>
                                </ListItem>
                            </div>
                            
                        </div>
                        
                        <div className="col-md-3">
                            <ListItem disabled={true}>
                            <div className="col-md-4">
                                
                                    <IconButton iconStyle={styles.iconStyles.smallIcon}
                                    style={styles.iconStyles.small} tooltip="Download"
                                        >
                                        <FileDownload onClick={()=> this.onFileClick(file.fileid,file.name,this.props.activeUserData.loginData.userid)}/>
                                    </IconButton>
                                

                                {/* <RaisedButton label="Download" style={{marginTop:"15px"}} backgroundColor={green300}
                                    onClick={()=>this.onFileClick(file.fileid,file.name,this.props.activeUserData.loginData.userid)}
                                    /> */}
                            </div>
                            <div className="col-md-4">
                                <IconButton iconStyle={styles.iconStyles.smallIcon}
                                    style={styles.iconStyles.small} tooltip="Share"
                                        >
                                        <Share onClick={()=> this.onShareClick(file,"file",this.props.activeUserData.loginData.userid)}/>
                                    </IconButton>
                            </div>
                            <div className="col-md-4">

                                <IconButton iconStyle={styles.iconStyles.smallIcon}
                                        style={styles.iconStyles.small} tooltip="Delete"
                                            >
                                            <FileDelete onClick={()=> this.deleteFile(file.fileid,this.props.activeUserData.loginData.userid,"own")}/>
                                </IconButton>

                                {/* <RaisedButton label="Delete" style={{marginTop:"15px"}} backgroundColor={red300}
                                    onClick={()=>this.deleteFile(file.fileid,this.props.activeUserData.loginData.userid)}
                                    /> */}
                            </div>
                            </ListItem>
                        </div>
                        <Divider style={{marginLeft:"13px"}}/>
                    </div>
                    
             
            );   
        });

    }

    
    createFolderList() {
    
        //console.log("files: "+Object.keys(this.props.files).length)
        return this.props.folders.map((folder) => {
            return(
                
                <div>
                    <div className="row">
                        
                        <div className="col-md-9">
                            <div className="col-md-6">
                                <ListItem
                                    key = {folder.folderid}
                                    disabled={false}
                                    onClick={()=>this.onFolderClick(folder.folderid,folder.name)}>

                                    <div className="row">
                                        <div className="col-md-3">
                                        
                                            <Avatar
                                                icon={<DriveFolder />}
                                                color={blue500}
                                                backgroundColor={grey100}      
                                            />
                                            
                                        </div>
                                        
                                        <div className="col-md-6" style={{marginTop:"13px"}}>
                                            {folder.name}
                                        </div>
                                        
                                    </div>
                                </ListItem>
                            </div>
                            <div className="col-md-2">
                               <ListItem disabled={true}>
                                {!folder.starred &&<IconButton iconStyle={styles.iconStyles.verySmallIcon} tooltip="Star"
                                    onClick={()=> this.onStarFolderClick(folder.folderid)}>
                               
                                    <StarBlank backgroundColor={fullWhite} color={blue500}
                                        style={styles.iconStyles.verySmall} 
                                        onClick={()=> this.onStarFolderClick(folder.folderid)}/>
                                 </IconButton>}
                                 {folder.starred &&<IconButton iconStyle={styles.iconStyles.verySmallIcon} tooltip="Remove From Star"
                                    onClick={()=> this.onUnStarFolderClick(folder.folderid)}>
                               
                                   <StarShaded backgroundColor={fullWhite} color={blue500}
                                        style={styles.iconStyles.verySmall} 
                                        onClick={()=> this.onUnStarFolderClick(folder.folderid)}/>
                                 </IconButton>}
                                </ListItem>
                            </div>
                            <div className="col-md-4">
                                <ListItem disabled={true}>
                                    <div className="row" style={{marginTop:"13px"}}>
                                        
                                        {folder.dateUploaded}
                                    
                                    </div>
                                </ListItem>
                            </div>
                            
                        </div>
                        
                        <div className="col-md-3">
                            <ListItem disabled={true}>
                                <div className="col-md-4 col-md-offset-4">
                                    <IconButton iconStyle={styles.iconStyles.smallIcon}
                                        style={styles.iconStyles.small} tooltip="Share"
                                            >
                                            <Share onClick={()=> this.onShareClick(folder,"folder",this.props.activeUserData.loginData.userid)}/>
                                    </IconButton>
                                </div>
                                <div className="col-md-4">

                                    <IconButton iconStyle={styles.iconStyles.smallIcon}
                                                style={styles.iconStyles.small} tooltip="Delete"
                                                    >
                                                    <FileDelete onClick={ ()=>this.deleteFolder(folder.folderid,this.props.activeUserData.loginData.userid,"own")}/>
                                    </IconButton>
                                        {/* <RaisedButton label="Delete" style={{marginTop:"15px"}} backgroundColor={red300}
                                        onClick={()=>this.deleteFolder(folder.folderid,this.props.activeUserData.loginData.userid)}
                                    /> */}
                                </div>
                            </ListItem>
                            
                        </div>
                        <Divider style={{marginLeft:"13px"}}/>
                    </div>
                    
                
                </div>
            );   
        });
    
    }

    exitCreateFolder(){
        this.props.createFolderDone();
    }

    render(){
        
        const overlayStyle = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0,0,0,0)',
            height:"100vh",
            color: '#fff'}

            return(
                
                <div>
                    {this.props.shareData.isOpen && <ShareModal/>}
                    <div className="row" style={styles.accountMargin}>
                        <h1>Dropbox</h1>
                    </div>
                    <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>
                    
                    <MuiThemeProvider>
                        <div>
                            
                            <div className="row">
                            
                                <div className="col-md-9">
                                
                                    <div className="col-md-6">
                                    <ListItem disabled={true}>
                                        <div >
                                            <div className="col-md-6 col-md-offset-2" style={{color:"#6b7684"}}>
                                                Name
                                            </div>
                                        </div>
                                    </ListItem>
                                    </div>

                                    <div className="col-md-3 col-md-offset-2" >
                                        <ListItem disabled={true}>
                                            <div className="row" style={{color:"#6b7684"}}>
                                                Date Uploaded
                                            </div>
                                        </ListItem>
                                    </div>
                                    
                                </div>
                                
                            </div>
                    </div>
                    </MuiThemeProvider>
                    
                    <div className="row">
                        <Dropzone 
                            onDrop={this.onDrop.bind(this)} 
                            style={overlayStyle}
                            disableClick
                            > 
                            
                            <MuiThemeProvider>
                                <div>
                                    {this.props.createFolder.create && <CreateFolder/>}
                                    {this.createFolderList()}
                                
                                    {this.createFileList()}
                                    
                                </div>
                            </MuiThemeProvider>
                        
                        </Dropzone>
                    </div>
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
        shareData:state.shareData,

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
            share,
            shareDone,

        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(CommonHome);
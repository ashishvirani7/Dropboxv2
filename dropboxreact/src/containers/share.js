import React, { Component } from 'react';
import styles from './style.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fileDownload from 'js-file-download';

import {getSharedFiles} from '../actions/getSharedFilesAction';
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
import ShareIcon from 'material-ui/svg-icons/social/share';
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

class Share extends React.Component{

    getSharedFilesCall(userid){
        API.getSharedFiles(userid)
        .then((res) => {
            if (res.status === 201) {
                res.json().then(data => {
                    //console.log("got this: "+data);
                    this.props.getSharedFiles(data);
                });
                
            } else if (res.status === 401) {
                console.log("Fail");
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


    componentWillMount(){
        
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 202) {
                    this.props.history.push("/login");
                }
        });
        this.getSharedFilesCall({userid:this.props.activeUserData.loginData.userid});
    };

    deleteFile = (fileid,userid,type) => {
        
        API.deleteFile({fileid,userid,type})
        .then(res =>{
            if(res.status===201){
                this.getSharedFilesCall({userid:this.props.activeUserData.loginData.userid});
            }
        });
    };

    deleteFolder = (folderid,userid,type) => {
        
        API.deleteFolder({folderid,userid})
        .then(res =>{
            if(res.status===201){
                this.getSharedFilesCall({userid:this.props.activeUserData.loginData.userid});
            }
        });
    };

    onFolderClick = (folderid,name) => {
        console.log("folder id : "+folderid);
        //this.getFilesCall({path:this.props.location.pathname+name,userid:this.props.activeUserData.loginData.userid});
        console.log(this.props.path);
        this.props.history.push(this.props.path+name);
        
        this.props.folderClick(name);
        //window.location.reload();
        //console.log("this is something: "+this.props.location.pathname);
    };

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
                                     >
                             
                                     <StarBlank backgroundColor={fullWhite} color={blue500}
                                         style={styles.iconStyles.verySmall} 
                                         />
                                 </IconButton>}
                                 {file.starred &&<IconButton iconStyle={styles.iconStyles.verySmallIcon} tooltip="Remove From Star"
                                     >
                             
                                 <StarShaded backgroundColor={fullWhite} color={blue500}
                                         style={styles.iconStyles.verySmall} 
                                         />
                                 </IconButton>}
                                 </ListItem>
                             </div>
                             <div className="col-md-4">
                                 <ListItem disabled={true}>
                                     <div className="row" style={{marginTop:"13px"}}>
                                         
                                         {file.dateShared}
                                     
                                     </div>
                                 </ListItem>
                             </div>
                             
                         </div>
                         
                         <div className="col-md-3">
                             <ListItem disabled={true}>
                             <div className="col-md-4 col-md-offset-2">
                                 
                                     <IconButton iconStyle={styles.iconStyles.smallIcon}
                                     style={styles.iconStyles.small} tooltip="Download"
                                         >
                                         <FileDownload onClick={()=> this.onFileClick(file.fileid,file.name,file.ownerid)}/>
                                     </IconButton>
                                 
 
                                 {/* <RaisedButton label="Download" style={{marginTop:"15px"}} backgroundColor={green300}
                                     onClick={()=>this.onFileClick(file.fileid,file.name,this.props.activeUserData.loginData.userid)}
                                     /> */}
                             </div>
                             
                             <div className="col-md-4 ">
 
                                 <IconButton iconStyle={styles.iconStyles.smallIcon}
                                         style={styles.iconStyles.small} tooltip="Delete"
                                             >
                                             <FileDelete onClick={()=> this.deleteFile(file.fileid,this.props.activeUserData.loginData.userid,"shared")}/>
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
 
     

    createFolderList(){
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
                                    >
                               
                                    <StarBlank backgroundColor={fullWhite} color={blue500}
                                        style={styles.iconStyles.verySmall} 
                                        />
                                 </IconButton>}
                                 {folder.starred &&<IconButton iconStyle={styles.iconStyles.verySmallIcon} tooltip="Remove From Star"
                                    >
                               
                                   <StarShaded backgroundColor={fullWhite} color={blue500}
                                        style={styles.iconStyles.verySmall} 
                                        />
                                 </IconButton>}
                                </ListItem>
                        </div>
                        <div className="col-md-4">
                                <ListItem disabled={true}>
                                    <div className="row" style={{marginTop:"13px"}}>
                                        
                                        {folder.dateShared}
                                    
                                    </div>
                                </ListItem>
                        </div>
                            

                    </div>
                    <div className="col-md-3">
                            <ListItem disabled={true}>
                                <div className="col-md-4 col-md-offset-4">
                                    
                                </div>
                                <div className="col-md-4 col-md-offset-6">

                                    <IconButton iconStyle={styles.iconStyles.smallIcon}
                                                style={styles.iconStyles.small} tooltip="Delete"
                                                    >
                                                    <FileDelete onClick={ ()=>this.deleteFolder(folder.folderid,this.props.activeUserData.loginData.userid,"shared")}/>
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
    render(){
        return(
            <div>
                <div className="row" style={styles.accountMargin}>
                    <h1>Sharing</h1>
                </div>
                <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>
                <div className="row" style={styles.accountMargin}>
                    <h4>Shared With Me</h4>
                </div>
                <hr style={{borderWidth:"1px" ,borderStyle:"inset"}}/>
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
                                            Date Shared
                                        </div>
                                    </ListItem>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                 </MuiThemeProvider>
                    
                <div className="row">
                    
                        <MuiThemeProvider>
                            <div>
                                {this.createFolderList()}
                                {this.createFileList()}
                            </div>
                        </MuiThemeProvider>
                    
                </div>
            </div>

            
            
        );
    }
}



function mapStateToProps(state){
    return{
        files:state.sharedFiles.files,
        folders:state.sharedFiles.folders,
        activeUserData:state.activeUserData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            getSharedFiles,

        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Share);
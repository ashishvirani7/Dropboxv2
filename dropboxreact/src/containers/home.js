import React, { Component } from 'react';
import {persistStore, autoRehydrate} from 'redux-persist'
import PropTypes from 'prop-types';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import {logout} from '../actions/logoutAction';
import {createFolder} from '../actions/createFolderAction';
import {setPath} from '../actions/pathAction.js';
import {getFiles} from '../actions/getFilesAction';
import {getFolders} from '../actions/getFoldersAction';
import {createFolderDone} from '../actions/createFolderAction';
import styles from './style.css';
import store from '../index';
import * as API from '../api/API';

import CommonHome from './commonHome';
import Logs from './logs';
import Account from './account';
import Share from './share';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import LogoutAvtar from 'material-ui/svg-icons/action/exit-to-app';
import {List, ListItem} from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionGroup from 'material-ui/svg-icons/action/group-work';
import DriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  blue300,
  indigo900,
  orange800,
  deepOrange300,
  pink400,
  purple500,
  green700,
  fullWhite,

} from 'material-ui/styles/colors';

const style1 = {
    marginLeft:"25px",
    marginTop:"25px"
  };

  const divStyle ={
    backgroundColor:"#F8F9FA",
    height: "100vh"
  };

  const divStyle1 ={
    height: "100vh",
    overflow:"scroll"
  };


class Home extends React.Component{

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
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (!res || res.status === 202) {
                    this.props.history.push("/login");
                }
        });
    }    

    handleLogout(){
        API.doLogout(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 201) {
                persistStore(store).purge();
                NotificationManager.info( "Logout Successful","Bye", 2500, true);
                this.props.history.push("/login");
                this.props.logout();
            }
        });
        
    }

    handleProfile(){
        this.props.history.push("/account");
      }
    
    redirectToHome(){
      //this.props.history.push("/home/"+this.state.path);
      this.props.createFolderDone();
      this.props.history.push("/home");
      //this.getFilesCall({path:"/home/",userid:this.props.activeUserData.loginData.userid});
      //this.getFoldersCall({path:"/home/",userid:this.props.activeUserData.loginData.userid});
      this.props.setPath("/home");
      //window.location.reload();
    }
    
    redirectToLogs(){
        //this.props.history.push("/logs/"+this.state.path);
        this.props.history.push("/logs");
    }

    redirectToShared(){
        //this.props.history.push("/logs/"+this.state.path);
        
        this.props.history.push("/share");
    }
    
    render(){
        return(
            <div className="row">
              <div className="col-md-2" style={divStyle}>

                <center>
                    < img src={require('../images/dropbox.svg')} 
                  style={styles.imageStyle} onClick={()=>{this.redirectToLogs()}}
                /></center>
                <div>
                <MuiThemeProvider>
                  
                  <List style={style1}>
                    <ListItem primaryText="My Files" style={{color:"#a2a9b2",marginLeft:"20px"}} onClick={()=>{this.redirectToHome()}}/>
                    <ListItem primaryText="Sharing" style={{color:"#a2a9b2",marginLeft:"20px"}} onClick={()=> {this.redirectToShared()}}/>
                    <ListItem primaryText="Deleted Files" style={{color:"#a2a9b2",marginLeft:"20px"}} onClick={()=>{this.redirectToHome()}}/>
                  </List>
                  
                </MuiThemeProvider>
                </div>
              </div>
              <div className="col-md-8" style={divStyle1}>
                <Route path='/home' component={CommonHome}/>
                <Route exact path='/logs' component={Logs}/>
                <Route exact path='/account' component={Account}/>
                <Route exact path='/share' component={Share}/>
                
              </div>
              <div className="col-md-2" style={divStyle}>
                <div className="row">
                  <div className="col-md-4">
                    <MuiThemeProvider>
                        <div>
                            <IconButton iconStyle={styles.iconStyles.mediumIcon}
                            style={styles.iconStyles.medium} tooltip="Profile"
                                onClick={()=> this.handleProfile()}>
                            <ActionAccountCircle/>
                            </IconButton>
                            <h6 style={{marginLeft:"17px"}} onClick={()=> this.handleProfile()}> Account </h6>
                        </div>
                        
                        </MuiThemeProvider>
                  </div>
                
                  <div className="col-md-4">
                    <MuiThemeProvider>
                        <div>
                          <div className="row">
                            <IconButton iconStyle={styles.iconStyles.mediumIcon}
                              style={styles.iconStyles.medium} tooltip="Sign Out"
                                onClick={()=> this.handleLogout()}>
                              <LogoutAvtar />
                            </IconButton>
                            <h6 style={{marginLeft:"17px"}} onClick={()=> this.handleLogout()}> Sign Out </h6>
                          </div>
                          
                        </div>
                        
                      </MuiThemeProvider>
                  </div>
                </div>
                <div className="row">
                  
                    <MuiThemeProvider>
                      <div className="col-md-offset-1">
                        
                          <RaisedButton label="Create Folder"   backgroundColor="#2167f6" style={{marginTop:"40px"}}
                              onClick={()=> this.props.createFolder()}  
                          />
                      </div>
                    </MuiThemeProvider>
                  
                </div>
              </div>
          </div>
        );
      }
}

function mapStateToProps(state){
    return{
        activeUserData:state.activeUserData,
        path:state.path,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            logout:logout,
            createFolder,
            setPath,
            getFiles,
            getFolders,
            createFolderDone,


        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Home);
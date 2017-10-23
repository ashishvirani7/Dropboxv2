import React, { Component } from 'react';
import {persistStore, autoRehydrate} from 'redux-persist'
import PropTypes from 'prop-types';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from '../actions/logout';
import styles from './style.css';
import store from '../index';
import * as API from '../api/API';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import LogoutAvtar from 'material-ui/svg-icons/action/exit-to-app';
import {
  blue500,
  indigo900,
  orange800,
  deepOrange300,
  pink400,
  purple500,
  green700,
} from 'material-ui/styles/colors';

class Home extends React.Component{

    componentWillMount(){
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 202) {
                    this.props.history.push("/login");
                }
        });
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
    
    render(){
        if(this.props.activeUserData.loginData){
            return(
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <h3>Username: {this.props.activeUserData.loginData.username} </h3>
                        <h3>Firstname: {this.props.activeUserData.personalData.firstname} </h3>
                        <h3>Lastname: {this.props.activeUserData.personalData.lastname} </h3>
                    </div>
                    <div className="col-md-1 col-md-offset-3">
                    <MuiThemeProvider>
                        <div>
                        <IconButton iconStyle={styles.iconStyles.mediumIcon}
                            style={styles.iconStyles.medium} tooltip="Sign Out"
                            onClick={()=> this.handleLogout()}>
                            <LogoutAvtar />
                        </IconButton>
                        <h6 style={{marginLeft:"17px"}} onClick={()=> this.handleLogout()}> Sign Out </h6>
                        </div>
                    </MuiThemeProvider>
                    </div>
                </div>
            );
        }
        else{
            return (<div></div>);
        }
    }
}

function mapStateToProps(state){
    return{
        activeUserData:state.activeUserData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            logout:logout,
        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Home);
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js'

import {changeValue} from '../actions/loginActions.js';
import {loginSuccess} from '../actions/loginActions.js';
import * as API from '../api/API';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

import RaisedButton from 'material-ui/RaisedButton';
import styles from './style.css';
import SigninAvtar from 'material-ui/svg-icons/action/account-balance';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {
    cyan900, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,blue500
} 
from 'material-ui/styles/colors';

const style = {
    marginLeft: 20,
  };
const style2 = {
    marginTop: "150px",
  };

  const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500,
        textColor: cyan900,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        shadowColor: fullBlack,
    },
    appBar: {
      height: 50,
    },
  });

class Login extends React.Component{

    componentWillMount(){
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 201) {
                    this.props.history.push("/home");
            }
        });
    }    

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(user => {
                    console.log(user.loginData.username);
                    this.props.loginSuccess(user);
                    NotificationManager.success("Welcome", "Login Successful", 2500, true);
                    this.props.history.push("/home");
                });
        
            } else if (res.status === 401) {
                console.log("Fail");
                NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                this.props.history.push("/");
            }
            
        });
    };

    handleSignup(){
        this.props.history.push('/signup');
    }
   
    render(){
        
            return(
                <div className="row">
                    <div>
                        <MuiThemeProvider muiTheme={muiTheme}>
                        
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-lg-6 col-md-offset-3 col-sm-offset-3 col-lg-offset-3" style={styles.mTop}>
                                <AppBar title="Signin" iconElementLeft={<IconButton><SigninAvtar /></IconButton>}
                                    iconElementRight={<FlatButton label="Sign up" onClick={()=>this.handleSignup()}/>}/>
                                <Paper zDepth={5}>
                                <br/>
                                <TextField hintText="Email address" style={style} underlineShow={false} name="username"
                                onChange={(event)=>
                                {event.persist();
                                this.props.changeValue(event)}}
                                />
                                <br/>
                                <TextField hintText="Password" style={style} type="password" underlineShow={false} name="password"
                                onChange={(event)=>
                                {event.persist();
                                this.props.changeValue(event)}}
                                />
                                <br/>
                                <center>
                                    <RaisedButton label="Submit" primary={true} style={style}
                                    onClick={()=> this.handleSubmit(this.props.loginData)}
                                    />
                                </center>
                                <br/>
                                </Paper>
                                </div>
                            </div>
                        </MuiThemeProvider>
                    </div>
            </div>
            );
    }
    
}

function mapStateToProps(state){
    
    return{
        loginData:state.loginData,
        activeUserData:state.activeUserData,
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValue:changeValue,
            loginSuccess:loginSuccess,
        }
        ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Login);


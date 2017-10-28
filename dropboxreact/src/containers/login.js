import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {persistStore, autoRehydrate} from 'redux-persist'

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js'

import {changeValue} from '../actions/loginAction.js';
import {loginSuccess} from '../actions/loginAction.js';
import {setPath} from '../actions/pathAction.js';
import * as API from '../api/API';
import store from '../index';
import {logout} from '../actions/logoutAction';

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

const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"; 
class Login extends React.Component{

    constructor(props) {
        super(props)
        this.state = { errorEmailText: ''}
    }

    componentWillMount(){
        
        API.doSessionCheck(this.props.activeUserData.loginData)
        .then((res) => {
            if (res.status === 201) {
                    this.props.history.push("/home");
            }
            else{
                persistStore(store).purge(); 
                this.props.logout();
            }
        });
    }    

    handleSubmit = (userdata) => {
        
        if(userdata.username.match(emailRegex)){
            if((userdata.password).toString().length > 0 ){
                this.setState({ errorEmailText: '',errorPasswordText: '' });
                API.doLogin(userdata)
                .then((res) => {
                    if (res.status === 201) {
                        console.log("Success");
                        res.json().then(user => {
                            this.props.loginSuccess(user);
                            this.props.setPath("/");
                            NotificationManager.success("Welcome", "Login Successful", 2500, true);
                            this.props.history.push("/home");
                        });
                
                    } else if (res.status === 401) {
                        console.log("Fail");
                        NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                        this.props.history.push("/");
                    } 
                });
            }
            else{
                this.setState(...this.state,{ errorPasswordText: 'Please enter a password' })
            }
            
        } else {
            this.setState(...this.state,{ errorEmailText: 'Invalid email' })
        }
    };

    onEmailChange = (event) => {
        this.setState({ errorEmailText: '' });
    }
    onPasswordChange = (event) => {
        this.setState({...this.state, errorPasswordText: '' });
    }

    handleSignup(){
        this.props.history.push('/signup');
    }
    
    render(){
        
            return(
                
                    <div>
                        <MuiThemeProvider muiTheme={muiTheme}>
                        
                            <div className="row">
                                <div style={styles.mTop}>
                                <AppBar title="Signin" iconElementLeft={<IconButton><SigninAvtar /></IconButton>}
                                    iconElementRight={<FlatButton label="Sign up" onClick={()=>this.handleSignup()}/>}/>
                                <Paper zDepth={5}>
                                <br/>
                                
                                <TextField hintText="Email address" style={styles.mLeft} underlineShow={false} name="username"
                                floatingLabelText="Enter email or username" hintText="Email" errorText={this.state.errorEmailText}
                                onChange={(event)=>
                                {event.persist();
                                this.props.changeValue(event);
                                this.onEmailChange(event)}}
                                />
                                <br/>
                                <TextField hintText="Password" style={styles.mLeft} underlineShow={false} name="password" type="password"
                                floatingLabelText="Enter Password" hintText="Password" errorText={this.state.errorPasswordText}
                                onChange={(event)=>
                                {event.persist();
                                this.props.changeValue(event);
                                this.onPasswordChange(event);}}
                                />
                                <br/>
                                <center>
                                    <RaisedButton label="Submit" primary={true} style={styles.mLeft}
                                    onClick={()=> this.handleSubmit(this.props.loginData)}
                                    />
                                </center>
                                <br/>
                                </Paper>
                                </div>
                            </div>
                        </MuiThemeProvider>
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
            changeValue,
            loginSuccess,
            logout,
            setPath,

        }
        ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Login);


import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {changeValue} from '../actions/signupActions';
import * as API from '../api/API';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import SignupAvtar from 'material-ui/svg-icons/action/supervisor-account';
import styles from './style.css';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
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



class Signup extends React.Component{

    handleSubmit = (userdata) => {
        
        API.doSignup(userdata)
            .then((response) => {
                if (response.status === 202) {
                    NotificationManager.error("Username exists", "Signup failed", 2500, true);
                    this.props.history.push("/signup");
                }
                else if(response.status === 201){
                    NotificationManager.success("Login Now", "Signup Successful", 2500, true);
                    this.props.history.push("/login");
                }
                else{
                    console.log("Fail");
                }
            });
    };
    handleLogin(){
        this.props.history.push('/login');
    }

    render(){
        return(
            <div>
            <MuiThemeProvider muiTheme={muiTheme}>
            
                <div className="row">
                    <div className="col-md-6 col-md-offset-3" style={styles.mTop}>
                    <AppBar title="Signup" iconElementLeft={<IconButton><SignupAvtar /></IconButton>}
                    iconElementRight={<FlatButton label="Sign in" onClick={()=>this.handleLogin()}/>}
                    />
                    <Paper zDepth={5}>
                    <br/>
                    <TextField hintText="First name" style={styles.mLeft} underlineShow={false} name="firstname"
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event);
                    console.log(this.props);}} />
                    <br/>
                    <TextField hintText="Last name" style={styles.mLeft} underlineShow={false} name="lastname"
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event)}}
                     />
                    <br/>
                    <TextField hintText="Email address" style={styles.mLeft} underlineShow={false} name="username"
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event)}}
                    />
                    <br/>
                    <TextField hintText="Password" style={styles.mLeft} underlineShow={false} name="password" type="password"
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event)}}
                    />
                    <br/>
                    <center>
                        <RaisedButton label="Submit" primary={true} style={styles.mLeft}
                        onClick={()=> this.handleSubmit(this.props.signupData)}
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
        signupData:state.signupData
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {changeValue:changeValue,
        }
        ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Signup);
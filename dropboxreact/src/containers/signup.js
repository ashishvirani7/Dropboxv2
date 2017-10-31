import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {persistStore, autoRehydrate} from 'redux-persist';
import CryptoJS from 'crypto-js'

import * as API from '../api/API';
import store from '../index';
import {logout} from '../actions/logoutAction';
import {changeValue} from '../actions/signupAction';

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


const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"; 
class Signup extends React.Component{

    constructor(props) {
        super(props)
        this.state = { errorEmailText: '',errorPasswordText:'',errorEmailText:'',errorLastText:''}
    }

    componentWillMount(){
        this.props.logout();
        persistStore(store).purge();
    }    


    handleSubmit = (userdata) => {

        if(userdata.username.match(emailRegex)){
            this.setState(...this.state,{errorEmailText:""});
            if((userdata.password).toString().length > 4 ){
                this.setState(...this.state,{errorPasswordText:""});
                if((userdata.firstname).toString().length > 1 ){
                    this.setState(...this.state,{errorFirstText:""});
                    if((userdata.lastname).toString().length > 1 ){
                        this.setState(...this.state,{errorLastText:""});

                        var cipherVal=CryptoJS.AES.encrypt(userdata.password,"ashish7");
                        
                        var signupDetails={
                            username:userdata.username,
                            password:cipherVal.toString(),
                            firstname:userdata.firstname,
                            lastname:userdata.lastname,
                        }

                        API.doSignup(signupDetails)
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

                    }
                    else{
                        this.setState({...this.state,errorLastText:"Last Name length must be greater than 1"});
                    }
                }
                else{
                    this.setState({...this.state,errorFirstText:"First Name length must be greater than 1"});
                }
            }
            else{
                this.setState({...this.state,errorPasswordText:"Password length must be greater than 4"});
            }
        } 
        else {
            this.setState({...this.state, errorEmailText: 'Invalid email' })
        }
    };
    handleLogin(){
        this.props.history.push('/login');
    }

    onEmailChange = (event) => {
        this.setState({...this.state, errorEmailText: '' });
    }
    onPasswordChange = (event) => {
        this.setState({...this.state, errorPasswordText: '' });
    }
    onFirstChange = (event) => {
        this.setState({...this.state, errorFirstText: '' });
    }
    onLastChange = (event) => {
        this.setState({...this.state, errorLastText: '' });
    }


    render(){
        return(
            <div>
            <MuiThemeProvider muiTheme={muiTheme}>
            
                <div className="row">
                    <div style={styles.mTopSignup}>
                    <AppBar title="Signup" iconElementLeft={<IconButton><SignupAvtar /></IconButton>}
                    iconElementRight={<FlatButton label="Sign in" onClick={()=>this.handleLogin()}/>}
                    />
                    <Paper zDepth={5}>
                    <br/>
                    <TextField hintText="First name" style={styles.mLeft} underlineShow={false} name="firstname"
                    floatingLabelText="Enter First Name" hintText="First Name" errorText={this.state.errorFirstText}
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event);
                    this.onFirstChange(event);}} />
                    <br/>
                    <TextField hintText="Last name" style={styles.mLeft} underlineShow={false} name="lastname"
                    floatingLabelText="Enter Last Name" hintText="Last Name" errorText={this.state.errorLastText}
                    onChange={(event)=>
                    {event.persist();
                    this.props.changeValue(event);
                    this.onLastChange(event)}}
                     />
                    <br/>
                    <TextField hintText="Email" style={styles.mLeft} underlineShow={false} name="username"
                    floatingLabelText="Enter email" hintText="Email" errorText={this.state.errorEmailText}
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
         logout:logout,
        }
        ,dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Signup);
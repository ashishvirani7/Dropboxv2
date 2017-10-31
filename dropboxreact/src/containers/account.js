import React, { Component } from 'react';
import styles from './style.css';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Account extends React.Component{
    render(){
        
        return(
            
            <div className="row" style={styles.accountMargin}>
                <h1>Account</h1>
                <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>
                
                <h2>Username: {this.props.activeUserData.loginData.username} </h2>
                <h2>Firstname: {this.props.activeUserData.personalData.firstname} </h2>
                <h2>Lastname: {this.props.activeUserData.personalData.lastname} </h2>
                
            </div>
        );
    
    
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
            
        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Account);
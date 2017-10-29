import React, { Component } from 'react';
import styles from './style.css';

class Account extends React.Component{
    render(){
        return(
            <div className="row" style={styles.accountMargin}>
                <h1>Account</h1>
                <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>
            </div>
        );
    }
}

export default Account;
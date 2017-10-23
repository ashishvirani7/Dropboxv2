import React, { Component } from 'react';
import styles from './style.css';

class Account extends React.Component{
    render(){
        return(
            <div className="row" style={styles.accountMargin}>
                <h1>Account</h1>
            </div>
        );
    }
}

export default Account;
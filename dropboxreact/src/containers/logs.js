import React, { Component } from 'react';
import styles from './style.css';

class Logs extends React.Component{
    render(){
        return(
            <div className="row" style={styles.accountMargin}>
                <h1>Recent</h1>
            </div>
        );
    }
}

export default Logs;
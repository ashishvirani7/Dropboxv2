import React, { Component } from 'react';
import styles from './style.css';

class Logs extends React.Component{
    render(){
        return(
            <div className="row" style={styles.accountMargin}>
                <h1>Home</h1>
                <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>
            </div>
        );
    }
}

export default Logs;
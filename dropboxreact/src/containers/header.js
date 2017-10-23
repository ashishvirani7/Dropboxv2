import React, { Component } from 'react';
import styles from './style.css';
import Login from './login';
import Signup from './signup';
import { BrowserRouter, Route } from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <div>
                <div id="header" style={styles.tabcontent}>
                <div className="row">
                    <div className="col-md-1 col-md-offset-5" >
                        <img src={require('../images/dropbox.png')} 
                        style={styles.imageStyle1}/>
                    </div>
                    <div className="col-md-6">
                        <h1>Dropbox</h1>
                    </div>
                </div>
                
                </div>
                <div>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                </div>
            </div>
        );
    }
}

export default Header;
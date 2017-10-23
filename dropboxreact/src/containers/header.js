import React, { Component } from 'react';
import styles from './style.css';
import Login from './login';
import Signup from './signup';
import { BrowserRouter, Route } from 'react-router-dom';

const divStyle1 ={
    backgroundColor:"#58132b",
    height: "100vh",
  };
const divStyle2 ={
    backgroundColor:"#ffffff",
    height: "100vh",
};
const mTop ={
    marginTop: "200px",
};

class Header extends React.Component{

    render(){
        return(
            <div className="row" > 
                <div className="col-md-7 col-sm-7 col-lg-7" style={divStyle1}>
                    <div className="col-md-2 col-sm-2 col-lg-2 col-md-offset-3 col-sm-offset-3 col-lg-offset-3">              
                        <img src={require('../images/dropbox.svg')} 
                        style={styles.imageStyle1}/>
                    </div>
                    <div className="col-md-7 col-sm-7 col-lg-7">              
                    <h1><font color="white">Dropbox</font></h1>
                    </div>
                    <div style={mTop}>
                    
                        <center><p style={{"font-size":"85px"}}><font color="#b9cfe5">Put your creative</font></p>
                        <p style={{"font-size":"85px"}}><font color="#b9cfe5"> energy to work,</font></p>
                        <p style={{"font-size":"85px"}}><font color="#b9cfe5">with Dropbox</font></p></center>
                    
                    </div>
                </div>
                <div className="col-md-5 col-sm-5 col-lg-5" style={divStyle2}>
                    <div>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
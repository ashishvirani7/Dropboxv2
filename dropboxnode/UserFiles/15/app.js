import React, { Component } from 'react';
// import { Router, Route } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'
import Signup from './containers/signup.js';
import AppBar from 'material-ui/AppBar';
import Signin from './containers/signin';
import Home from './containers/home';
import CommonHome from './containers/commonHome';
import Header from './containers/header';
import Account from './containers/account';
const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
    
    </header>
    <main>
      
    </main>
  </div>
)


const App = () => (
  <div>
    <Route exact path="/" component={Header}/>
    <Route exact path="/signin" component={Header}/>
    <Route exact path="/signup" component={Header}/>
    <Route exact path="/home/:path" component={Home}/>
    <Route exact path="/account" component={Home}/>
    <Route exact path='/logs/:path' component={Home}/>
  </div>
);

export default App;

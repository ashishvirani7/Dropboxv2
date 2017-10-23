import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Login from './containers/login';
import Signup from './containers/signup';
import Home from './containers/home';

import {NotificationContainer, NotificationManager} from 'react-notifications';

const  App = () => {
    return(
      <div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/home" component={Home}/>
        <NotificationContainer/>
      </div>);
}

export default App;


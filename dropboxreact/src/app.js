import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Home from './containers/home';
import Header from './containers/header';

import {NotificationContainer, NotificationManager} from 'react-notifications';

const  App = () => {
    return(
      <div>
        <Route exact path="/" component={Header}/>
        <Route exact path="/login" component={Header}/>
        <Route exact path="/signup" component={Header}/>
      
        <Route exact path="/home" component={Home}/>
        <Route exact path="/account" component={Home}/>
        <Route exact path='/logs' component={Home}/>
        <NotificationContainer/>
      </div>);
}

export default App;


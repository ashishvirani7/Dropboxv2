import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';
import {compose, applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import reduxReset from 'redux-reset';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';

const enHanceCreateStore = compose(
    reduxReset(),
    autoRehydrate(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  )(createStore)
const store = enHanceCreateStore(allReducers)

//persistStore(store);
persistStore(store, {}, () => {
    ReactDOM.render(
        
        <Provider store = {store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    , 
    document.getElementById('root')
    );
  })


registerServiceWorker();

export default store;

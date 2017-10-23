import {combineReducers} from 'redux';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeUserData from './activeUserReducer';

const allReducers = combineReducers({
    loginData,
    signupData,
    activeUserData,
 });
 
 export default allReducers;
import {combineReducers} from 'redux';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeUserData from './activeUserReducer';
import path from './pathReducer';
import files from './getFilesReducer';

const allReducers = combineReducers({
    loginData,
    signupData,
    activeUserData,
    path,
    files,
    
 });
 
 export default allReducers;
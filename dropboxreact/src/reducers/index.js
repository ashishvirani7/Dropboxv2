import {combineReducers} from 'redux';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeUserData from './activeUserReducer';
import path from './pathReducer';
import files from './getFilesReducer';
import createFolder from './createFolderReducer';
import folders from './getFoldersReducer';
import activity from './activityReducer';

const allReducers = combineReducers({
    loginData,
    signupData,
    activeUserData,
    path,
    files,
    createFolder,
    folders,
    activity,
    
        
 });
 
 export default allReducers;
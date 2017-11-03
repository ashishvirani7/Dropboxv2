import {REHYDRATE} from 'redux-persist/constants';

export default function(state={files:[],folders:[]},action){
    switch(action.type){
        
        case "GET_SHARED_FILES":
        {
            return {files:action.data.files,folders:action.data.folders};
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.sharedfiles
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}
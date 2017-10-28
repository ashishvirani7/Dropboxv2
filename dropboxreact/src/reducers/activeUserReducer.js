import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    loginData:{},
    activeUserData:{},
}

export default function(state=initialState,action){
    switch(action.type){
        
        case "LOGIN_SUCCESS":
        {
            return action.data;
        }

    
        case "persist/REHYDRATE":
        {
            var incoming = action.payload.activeUserData
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}
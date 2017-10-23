import {REHYDRATE} from 'redux-persist/constants';


export default function(state={},action){
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
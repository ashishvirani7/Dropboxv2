import {REHYDRATE} from 'redux-persist/constants';


export default function(state=[],action){
    switch(action.type){
        
        case "GET_ACTIVITY":
        {
            return action.data;
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.activity
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}
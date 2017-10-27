import {REHYDRATE} from 'redux-persist/constants';

export default function(state={},action){
    switch(action.type){
        
        case "SET_PATH":
        {
            return action.data;
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.path
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}
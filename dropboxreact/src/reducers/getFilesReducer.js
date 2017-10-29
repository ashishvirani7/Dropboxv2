import {REHYDRATE} from 'redux-persist/constants';


export default function(state=[],action){
    switch(action.type){
        
        case "GET_FILES":
        {
            return action.data;
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.files
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}
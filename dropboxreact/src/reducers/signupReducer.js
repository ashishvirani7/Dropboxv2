import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    firstname:'',
    lastname:'',
    username:'',
    password:'',
}

export default function(state=initialState,action){
    switch(action.type){

        case "CHANGE_VALUE_SIGNUP":
        {
            return{
                ...state,
                [action.data.target.name]:action.data.target.value
            };
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.signupData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}
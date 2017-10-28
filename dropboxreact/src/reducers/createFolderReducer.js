import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    create:false,
    name:'',

};

export default function(state=initialState,action){
    switch(action.type){
        
        case "CREATE_FOLDER":
        {
            return {
                create:true,
                name:'',

            };
        }

        case "CREATE_FOLDER_DONE":
        {
            return {
                ...state,
                create:false,
            };
        }

        case "CREATE_FOLDER_NAME_CHANGE":
        {
            return {
                ...state,
                name:action.data.target.value,
            }
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.createFolder
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}
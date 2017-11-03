import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    isOpen:false,
};

export default function(state=initialState,action){
    switch(action.type){
        
        case "SHARE":
        {
            return {
                isOpen:true,
                content:action.data.content,
                userid:action.data.userid,
                type:action.data.type,

            };
        }

        case "SHARE_DONE":
        {
            return {
                isOpen:false,
            };
        }

        case "SHARE_EMAIL_CHANGE":
        {
            return {
                ...state,
                email:action.data.target.value,
            }
        }

        
        case "persist/REHYDRATE":
        {
            var incoming = action.payload.shareData
            if (incoming) return incoming
            return state
        }
                
        default:
            return state;
    }
}
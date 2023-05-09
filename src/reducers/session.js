import{
    LOG_IN,
    LOG_OUT
} from "../constants/ActionTypes"

const initialState = {
        isLogged: false,
    }

export default function session(state = initialState, action){
    switch(action.type){

        case LOG_OUT:
            return{
                ...state,
                isLogged: false,
            }

        case LOG_IN:
            return{
                ...state,
                isLogged: true,
            }

        default:
            return state
    }
}




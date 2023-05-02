import{
    LOG_IN,
    LOG_OUT
} from "../constants/ActionTypes"

const initialState = {
        isLogged: false,
        name: "",
        photoUrl: "",
        email: ""
    }

export default function session(state = initialState, action){
    switch(action.type){

        case LOG_OUT:
            return{
                ...state,
                isLogged: false,
                name: "",
                photoUrl: "",
                email: ""
            }

        case LOG_IN:
            let {name, photoUrl, email} = action.creditionals;
            
            return{
                ...state,
                isLogged: true,
                name,
                photoUrl,
                email
            }

        default:
            return state
    }
}




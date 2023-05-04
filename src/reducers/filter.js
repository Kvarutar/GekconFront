import{
    SET_FILTER
} from "../constants/ActionTypes";

const initialState = {
    category: "all"
}

export default function filter(state = initialState, action){
    switch(action.type){
        case SET_FILTER:
            return{
                ...state,
                category: action.creditionals
            }

        default:
            return state;
    }

}
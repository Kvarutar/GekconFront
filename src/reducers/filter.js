import{
    SET_NEWS_FILTER,
    SET_EVENTS_FILTER,
    SET_DISCUSSION_FILTER
} from "../constants/ActionTypes";

const initialState = {
    newsCategory: "all",
    eventsCategory: "all",
    discussionCategory: "all"
}

export default function filter(state = initialState, action){
    switch(action.type){
        case SET_NEWS_FILTER:
            return{
                ...state,
                newsCategory: action.creditionals
            }

        default:
            return state;
    }

}
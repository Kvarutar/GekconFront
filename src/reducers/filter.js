import{
    SET_NEWS_FILTER,
    SET_EVENTS_FILTER,
    SET_DISCUSSION_FILTER,
    SET_PROFILE_FILTER
} from "../constants/ActionTypes";

const initialState = {
    newsCategory: "all",
    eventsCategory: "all",
    discussionCategory: "all",
    profileCategory: "news"
}

export default function filter(state = initialState, action){
    switch(action.type){
        case SET_NEWS_FILTER:
            return{
                ...state,
                newsCategory: action.creditionals
            }

        case SET_PROFILE_FILTER:
            return{
                ...state,
                profileCategory: action.creditionals
            }

        default:
            return state;
    }
}
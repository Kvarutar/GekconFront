import{
    SET_NEWS_FILTER,
    SET_EVENTS_FILTER,
    SET_DISCUSSION_FILTER,
    SET_PROFILE_FILTER,
    SET_ROOMS_FILTER
} from "../constants/ActionTypes";

const initialState = {
    newsCategory: "all",
    eventsCategory: "all",
    discussionCategory: "themes",
    roomsCategory: "all",
    profileCategory: "news"
}

export default function filter(state = initialState, action){
    switch(action.type){
        case SET_NEWS_FILTER:
            return{
                ...state,
                newsCategory: action.creditionals
            }
        case SET_EVENTS_FILTER:
            return{
                ...state,
                eventsCategory: action.creditionals
            }
        case SET_DISCUSSION_FILTER:
            return{
                ...state,
                discussionCategory: action.creditionals
            }
        case SET_PROFILE_FILTER:
            return{
                ...state,
                profileCategory: action.creditionals
            }
        case SET_ROOMS_FILTER:
            return{
                ...state,
                roomsCategory: action.creditionals
            }
        default:
            return state;
    }
}
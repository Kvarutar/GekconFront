import{
    SET_USER_INFO,
    SET_REFRESH_TOKEN,
    SET_ACCESS_TOKEN
} from "../constants/ActionTypes"

const initialState = {
        id: "",
        personName: "",
        photoUrl: "",
        role: "",
        follows: [],
        followers: [],
        likedEvents: [],
        likedTags: [],
        accessToken: ""
    }

export default function user(state = initialState, action){
    switch(action.type){

        case SET_USER_INFO:
            const {id, name, photoUrl, role, follows, followers, likedEvents, likedTags} = action.creditionals;

            return {
                ...state,
                id: id,
                personName: name,
                photoUrl: photoUrl,
                role: role,
                follows: follows,
                followers: followers,
                likedEvents: likedEvents,
                likedTags: likedTags
            }

        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.creditionals
            }

        default:
            return state
    }
}

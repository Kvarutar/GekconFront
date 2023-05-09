import * as actionTypes from "../constants/ActionTypes";

export const login = () => ({ type: actionTypes.LOG_IN});
export const logout = () => ({ type: actionTypes.LOG_OUT });
export const setNewsFilter = creditionals => ({ type: actionTypes.SET_NEWS_FILTER, creditionals });
export const setEventsFilter = creditionals => ({ type: actionTypes.SET_EVENTS_FILTER, creditionals });
export const setDiscussionFilter = creditionals => ({ type: actionTypes.SET_DISCUSSION_FILTER, creditionals });
export const setProfileFilter = creditionals => ({type: actionTypes.SET_PROFILE_FILTER, creditionals});
export const setUserInfo = creditionals => ({type: actionTypes.SET_USER_INFO, creditionals});
export const setRefreshToken = creditionals => ({type: actionTypes.SET_REFRESH_TOKEN, creditionals});
export const setAccessToken = creditionals => ({type: actionTypes.SET_ACCESS_TOKEN, creditionals});
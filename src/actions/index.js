import * as actionTypes from "../constants/ActionTypes";

export const login = creditionals => ({ type: actionTypes.LOG_IN, creditionals });
export const logout = () => ({ type: actionTypes.LOG_OUT });
export const setNewsFilter = creditionals => ({ type: actionTypes.SET_NEWS_FILTER, creditionals });
export const setEventsFilter = creditionals => ({ type: actionTypes.SET_EVENTS_FILTER, creditionals });
export const setDiscussionFilter = creditionals => ({ type: actionTypes.SET_DISCUSSION_FILTER, creditionals });
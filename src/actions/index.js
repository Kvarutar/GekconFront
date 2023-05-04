import * as actionTypes from "../constants/ActionTypes";

export const login = creditionals => ({ type: actionTypes.LOG_IN, creditionals });
export const logout = () => ({ type: actionTypes.LOG_OUT });
export const setFilter = creditionals => ({ type: actionTypes.SET_FILTER, creditionals });
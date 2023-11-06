/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIREFRESH,
  AUTHENTICATION,
  LOG_IN,
  LOG_OUT,
  SEARCHDATA,
} from "./actions";

const apiRefresh = (payload: boolean) => {
  return {
    type: APIREFRESH,
    payload,
  };
};

const setSearchData = (payload: any) => {
  return {
    type: SEARCHDATA,
    payload,
  };
};
const logIn = (payload: any) => {
  return {
    type: LOG_IN,
    payload,
  };
};
const checkAuthentication = (payload: any) => {
  return {
    type: AUTHENTICATION,
    payload,
  };
};
const logout = () => {
  return {
    type: LOG_OUT,
  };
};

export { apiRefresh, setSearchData, logIn, checkAuthentication, logout };

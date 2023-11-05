/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIREFRESH,
  AUTHENTICATION,
  LOG_IN,
  LOG_OUT,
  SEARCHDATA,
} from "../actions/actions";

const globalReducer = (state: any, actions: any) => {
  const { type, payload } = actions;
  switch (type) {
    case APIREFRESH: {
      return { ...state, apiCallRefresh: payload };
    }
    case SEARCHDATA: {
      return { ...state, searchAvailable: payload };
    }
    case LOG_IN: {
      return { ...state, isAuthenticated: true };
    }
    case AUTHENTICATION: {
      return { ...state, isAuthenticated: payload };
    }
    case LOG_OUT: {
      return { isAuthenticated: false };
    }

    default:
      break;
  }
};
const initialState = {
  apiCallRefresh: false,
  searchAvailable: false,
  isAuthenticated: false,
};
export { globalReducer, initialState };

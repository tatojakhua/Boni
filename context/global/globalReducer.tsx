/* eslint-disable @typescript-eslint/no-explicit-any */
import { toggleLocalStorage } from "@/utils/jwt";
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
      const { accessToken } = payload;
      toggleLocalStorage(accessToken);
      return { isAuthenticated: true };
    }
    case AUTHENTICATION: {
      return { isAuthenticated: payload };
    }
    case LOG_OUT: {
      toggleLocalStorage(null);
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

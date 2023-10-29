/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIREFRESH, SEARCHDATA } from "../actions/actions";

const globalReducer = (state: any, actions: any) => {
  const { type, payload } = actions;
  switch (type) {
    case APIREFRESH: {
      return { ...state, apiCallRefresh: payload };
    }
    case SEARCHDATA: {
      return { ...state, currentSearchData: payload };
    }

    default:
      break;
  }
};
const initialState = {
  apiCallRefresh: false,
  values: {
    searchValue: "",
    dateRange: [],
  },
};
export { globalReducer, initialState };

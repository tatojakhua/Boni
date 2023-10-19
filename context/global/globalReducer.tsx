/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIREFRESH } from "../actions/actions";

const globalReducer = (state: any, actions: any) => {
  const { type, payload } = actions;
  switch (type) {
    case APIREFRESH: {
      return { ...state, apiCallRefresh: payload };
    }

    default:
      break;
  }
};
const initialState = {
  apiCallRefresh: false,
};
export { globalReducer, initialState };

import { APIREFRESH } from "../actions/actions";

const globalReducer = (state, actions) => {
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

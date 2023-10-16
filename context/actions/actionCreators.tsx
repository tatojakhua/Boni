import { APIREFRESH } from "./actions";

const apiRefresh = (payload: boolean) => {
  return {
    type: APIREFRESH,
    payload,
  };
};

export { apiRefresh };

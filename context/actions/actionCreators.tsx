/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIREFRESH, SEARCHDATA } from "./actions";

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

export { apiRefresh, setSearchData };

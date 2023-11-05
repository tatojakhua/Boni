/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {};

const Context = createContext(initialState);
import { globalReducer } from "./globalReducer";
import API from "@/utils/API";
import { checkAuthentication } from "../actions/actionCreators";
const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const checkTokenValidity = async () => {
    await API.post("auth/check-token")
      .then(() => {
        dispatch(checkAuthentication(true));
      })
      .catch(() => {
        try {
          refreshToken();
        } catch (error) {
          dispatch(checkAuthentication(false));
        }
      });
  };
  const refreshToken = async () => {
    await API.post("auth/refresh-token")
      .then(() => {
        dispatch(checkAuthentication(true));
      })
      .catch(() => {
        dispatch(checkAuthentication(false));
      });
  };
  useEffect(() => {
    checkTokenValidity();
  }, [state.apiCallRefresh, state.isAuthenticated]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context) {
    return context;
  }
  throw new Error("Context problem");
};

export default ContextProvider;

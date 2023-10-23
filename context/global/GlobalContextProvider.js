/* eslint-disable react/prop-types */
"use client";
import React, { createContext, useContext, useReducer } from "react";

const Context = createContext();
import { globalReducer, initialState } from "./globalReducer";
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
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

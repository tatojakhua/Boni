/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
"use client";
import React, { createContext, useContext, useReducer } from "react";

const initialState = {}; // Define your initial state here

const Context = createContext(initialState); // Provide the initial state as an argument
import { globalReducer } from "./globalReducer";
const ContextProvider = ({ children }: any) => {
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

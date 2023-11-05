"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Restaurants from "./(pages)/restaurants/page";
import LognIn from "./(pages)/sign-in/page";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const { state }: any = useGlobalContext();
  useEffect(() => {
    console.log("isAuthenticated CHECK");
    if (state.isAuthenticated) {
      route.push("/restaurants");
    } else {
      route.push("/sign-in");
    }
  }, [state.apiCallRefresh]);

  return <main>{state.isAuthenticated ? <Restaurants /> : <LognIn />}</main>;
}

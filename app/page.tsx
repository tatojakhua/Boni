"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
// import Restaurants from "./(pages)/restaurants/page";
import LognIn from "./(pages)/sign-in/page";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { usePathname, useRouter } from "next/navigation";

export default function Home({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { state }: any = useGlobalContext();
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/sign-in");
    } else {
      router.push(pathname);
    }
    if (!pathname || state.isAuthenticated) {
      router.push("/restaurants");
    }
  }, [state.apiCallRefresh, state.isAuthenticated]);

  return <main>{state.isAuthenticated ? children : <LognIn />}</main>;
}

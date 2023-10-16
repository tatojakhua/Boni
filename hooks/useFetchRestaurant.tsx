/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import API from "../utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";

const useFetchRestaurant = () => {
  const { state }: any = useGlobalContext();

  const [data, setdata] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const handleFetchAPI = async () => {
    setisLoading(true);
    await API.get("/restaurants/get-list")
      .then((res) => setdata(res.data))
      .catch((err) => setError(err.data))
      .finally(() => setisLoading(false));
  };

  useEffect(() => {
    handleFetchAPI();
  }, [state.apiCallRefresh]);
  return [data, Error, isLoading];
};

export default useFetchRestaurant;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import API from "../utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";

const useFetchRestaurant = (values: any) => {
  const { state }: any = useGlobalContext();
  const [data, setdata] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleFetchAPI = async () => {
    if (
      values.searchValue !== "" ||
      (values.dateRange && values.dateRange.length > 0)
    ) {
      setisLoading(true);
      await API.post("/restaurants/search", { values })
        .then((res) => setdata(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setisLoading(false));
    } else {
      setisLoading(true);
      await API.get("/restaurants/get-list")
        .then((res) => setdata(res.data))
        .catch((err) => setError(err.data))
        .finally(() => setisLoading(false));
    }
  };

  useEffect(() => {
    handleFetchAPI();
  }, [state?.apiCallRefresh]);

  return [data, Error, isLoading];
};

export default useFetchRestaurant;

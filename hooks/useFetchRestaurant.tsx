/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import API from "../utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { setSearchData } from "@/context/actions/actionCreators";

const useFetchRestaurant = (values: any) => {
  const { state, dispatch }: any = useGlobalContext();
  const [data, setdata] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleFetchAPI = async () => {
    if (state.searchAvailable) {
      setisLoading(true);
      await API.post("/restaurants/search", { values })
        .then((res) => setdata(res.data))
        .catch((err) => setError(err.message))
        .finally(() => {
          setisLoading(false), dispatch(setSearchData(false));
        });
    } else {
      setisLoading(true);
      await API.post("/restaurants/get-list")
        .then((res) => setdata(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setisLoading(false));
    }
  };

  useEffect(() => {
    handleFetchAPI();
  }, [state?.apiCallRefresh]);

  return [data, Error, isLoading];
};

export default useFetchRestaurant;

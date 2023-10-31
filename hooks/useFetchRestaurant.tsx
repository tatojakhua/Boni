/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import API from "../utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";

const useFetchRestaurant = (values: any) => {
  const { state }: any = useGlobalContext();
  const [data, setData] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchAPI = async () => {
    setIsLoading(true);
    try {
      if (
        values.searchValue !== "" ||
        (values.dateRange && values.dateRange.length > 0)
      ) {
        const res = await API.post("/restaurants/search", { values });
        setData(res.data);
      } else {
        const res = await API.get("/restaurants/get-list", {
          headers: {
            "Cache-Control": "no-store",
          },
        });
        setData(res.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAPI();
  }, [state?.apiCallRefresh]);

  return [data, Error, isLoading];
};

export default useFetchRestaurant;

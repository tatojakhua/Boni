/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";

const useFetchDetails = (id: any) => {
  const { state }: any = useGlobalContext();
  const [data, setdata] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const handleFetchAPI = async () => {
    setisLoading(true);
    try {
      const res = await API.get(`restaurant-details/${id}`);
      const modifiedData = res.data.map((item: any) => {
        let typeOfBottle;

        switch (item.typeOfBottle) {
          case "1":
            typeOfBottle = "არგო";
            break;
          case "2":
            typeOfBottle = "ზედაზენი";
            break;
          case "3":
            typeOfBottle = "ნატახტარი";
            break;
          case "4":
            typeOfBottle = "შერეული";
            break;
          default:
            typeOfBottle = "სხვა";
        }

        return {
          ...item,
          typeOfBottle,
        };
      });
      setdata(modifiedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    handleFetchAPI();
  }, [state.apiCallRefresh]);

  return [data, Error, isLoading];
};

export default useFetchDetails;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CardItem from "./CardItem";
import useFetchRestaurant from "../../hooks/useFetchRestaurant";
import CardLoader from "./CardLoader";

const CardWrapper = () => {
  const [Data, Error, isLoading]: any = useFetchRestaurant();

  if (Error) {
    return <h1>დაფიქსირდა შეცდომა</h1>;
  }
  return (
    <div className="flex flex-row justify-around items-center flex-wrap p-6 my-10 border-2 border-yellow-500">
      {Data?.map((item: any) =>
        isLoading ? (
          <CardLoader key={item.id} />
        ) : (
          <CardItem key={item.id} item={item} />
        )
      )}
    </div>
  );
};

export default CardWrapper;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CardItem from "./CardItem";
import useFetchRestaurant from "../../hooks/useFetchRestaurant";

const CardWrapper = () => {
  const [Data, Error, isLoading]: any = useFetchRestaurant();
  if (Error) {
    return <h1>დაფიქსირდა შეცდომა</h1>;
  }

  return (
    <div className="flex flex-row justify-around items-center flex-wrap p-6 my-10 border-2 border-yellow-500">
      {Data.map((item: any) => (
        <CardItem key={item.id} item={item} loading={isLoading} />
      ))}
    </div>
  );
};

export default CardWrapper;

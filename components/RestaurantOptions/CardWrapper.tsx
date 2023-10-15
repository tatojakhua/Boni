import React from "react";
import CardItem from "./CardItem";
// import CardLoader from "./CardLoader";

const CardWrapper = () => {
  // if (error) {
  //     return (
  //         error
  //     )
  // }
  return (
    <div className="flex flex-row justify-around items-center flex-wrap p-6 my-10 border-2 border-yellow-500">
      <CardItem />
    </div>
  );
};

export default CardWrapper;

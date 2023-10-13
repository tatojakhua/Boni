"use client";
import React, { useState } from "react";

import { Button, Modal } from "antd";
import RestaurantForm from "@/components/RestaurantOptions/RestaurantForm";
import CardWrapper from "@/components/RestaurantOptions/CardWrapper";
import Search from "@/components/Search/Search";

const Restaurants = () => {
  const [openModal, setopenModal] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-around items-center flex-wrap mt-auto py-10 border-2 border-red-600">
        <Search />
        <Button type="primary" ghost onClick={() => setopenModal(true)}>
          რესტორნის დამატება
        </Button>
        <Modal
          title="ახალი რესტორნის დამატება"
          open={openModal}
          onOk={() => setopenModal(false)}
          onCancel={() => setopenModal(false)}
          footer={false}
        >
          <RestaurantForm setopenModal={setopenModal} />
        </Modal>
      </div>
      <div className="relative h-screen">
        <CardWrapper />
      </div>
    </>
  );
};

export default Restaurants;

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
      <div className="relative flex flex-col sm:flex-row justify-center sm:justify-between items-center px-16 py-6">
        <Search />
        <Button
          type="primary"
          ghost
          onClick={() => setopenModal(true)}
          style={{
            fontSize: "15px",
            height: "34px",
            padding: "4px 15px",
            fontWeight: 600,
            borderColor: "white",
            color: "white",
          }}
        >
          რესტორნის დამატება
        </Button>
        <Modal
          title="ახალი რესტორნის დამატება"
          open={openModal}
          onOk={() => setopenModal(false)}
          onCancel={() => setopenModal(false)}
          footer={false}
        >
          <RestaurantForm
            setopenModal={setopenModal}
            setopenModal2={undefined}
            item={undefined}
          />
        </Modal>
      </div>
      <div className="relative">
        <CardWrapper />
      </div>
    </>
  );
};

export default Restaurants;

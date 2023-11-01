"use client";
import React, { useState } from "react";
import { Space, Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import RestaurantDetails from "@/components/RestaurantOptions/RestaurantDetails";
import DetailTaskForm from "@/components/RestaurantOptions/DetailTaskForm";

const Page = () => {
  const [openModal, setopenModal] = useState(false);
  const router = useRouter();
  return (
    <div className="relative mx-5">
      <Space
        direction="horizontal"
        className="w-full flex flex-row  justify-between items-center py-5"
      >
        <Button
          type="primary"
          ghost
          onClick={() => router.back()}
          style={{
            fontSize: "15px",
            height: "34px",
            padding: "4px 15px",
            fontWeight: 600,
            borderColor: "white",
            color: "white",
          }}
        >
          უკან დაბრუნება
        </Button>

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
          დამატება
        </Button>
      </Space>

      <Modal
        title="ახალი ვიზიტის დამატება"
        onOk={() => setopenModal(false)}
        onCancel={() => setopenModal(false)}
        open={openModal}
        footer={false}
      >
        <DetailTaskForm
          setopenModal={setopenModal}
          setopenModal2={undefined}
          data={undefined}
        />
      </Modal>
      <RestaurantDetails />
    </div>
  );
};

export default Page;

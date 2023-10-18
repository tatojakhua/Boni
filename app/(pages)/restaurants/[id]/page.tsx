"use client";
import RestaurantDetails from "@/components/RestaurantOptions/RestaurantDetails";
import React, { useState } from "react";
import { Space, Button, Modal } from "antd";
import { useRouter } from "next/navigation";
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
        <Button type="primary" ghost onClick={() => router.back()}>
          უკან დაბრუნება
        </Button>
        <Button type="primary" ghost onClick={() => setopenModal(true)}>
          დამატება
        </Button>
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
      </Space>
      <RestaurantDetails />
    </div>
  );
};

export default Page;

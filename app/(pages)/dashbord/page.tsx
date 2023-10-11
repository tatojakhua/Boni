"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import DashboardForm from "@/components/DashboardForm/DashboardForm";

const Dashbord = () => {
  const [openModal, setopenModal] = useState(false);

  return (
    <>
      <div className="flex justify-end sm:justify-end items-center sm:flex-row flex-col mt-auto py-10 border-2 border-red-600">
        <Button className="mr-10" onClick={() => setopenModal(true)}>
          Primary Button
        </Button>
      </div>
      <Modal
        title="ახალი რესტორნის დამატება"
        open={openModal}
        onOk={() => setopenModal(false)}
        onCancel={() => setopenModal(false)}
        footer={false}
      >
        <DashboardForm />
      </Modal>
    </>
  );
};

export default Dashbord;

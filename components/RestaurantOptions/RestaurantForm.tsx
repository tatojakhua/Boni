/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import React from "react";
import { Form, Button, Input } from "antd";

const onFinish = (values: string) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  restaurantName?: string;
  ltdName?: string;
  city?: string;
};

type SetOpenModal = {
  setopenModal: any;
};

const RestaurantForm: React.FC<SetOpenModal> = ({
  setopenModal,
}: SetOpenModal) => (
  <div className="p-4 border-2 border-red-500">
    <Form
      layout="vertical"
      initialValues={{ layout: "vertical" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="რესტორნის სახელი"
        name="restaurantName"
        rules={[
          { required: true, message: "გთხოვთ მიუთითოთ რესტორნის სახელი!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="შ.პ.ს სახელწოდება"
        name="ltdName"
        rules={[
          { required: true, message: "გთხოვთ მიუთითოთ შ.პ.ს სახელწოდება!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="ქალაქი"
        name="city"
        rules={[{ required: true, message: "გთხოვთ მიუთითოთ ქალაქი!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="mt-10">
        <Button
          type="primary"
          danger
          ghost
          className="mr-[233px]"
          onClick={() => setopenModal(false)}
        >
          გამოსვლა
        </Button>

        <Button htmlType="submit" type="primary" ghost>
          დამატება
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default RestaurantForm;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";

type SetOpenModal = {
  setopenModal: any;
};

const DetailTaskForm: React.FC<SetOpenModal> = ({
  setopenModal,
}: SetOpenModal) => {
  const [form] = Form.useForm();
  const onFinish = (values: string) => console.log(values);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="მძღოლის სახელი"
        name="driverName"
        rules={[{ required: true, message: "გთხოვთ მიუთითოთ მძღოლის სახელი" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ბოთლის სახეობა"
        name="typeOfBottle"
        rules={[{ required: true, message: "გთხოვთ მიუთითოთ ბოთლის სახეობა" }]}
      >
        <Select
          placeholder="ბოთლის სახეობა"
          options={[
            { value: 1, label: "არგო" },
            { value: 2, label: "ზედაზენი" },
            { value: 3, label: "ნატახტარი" },
            { value: 4, label: "შერეული" },
            { value: 5, label: "სხვა" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="რაოდენობა"
        name="quantity"
        rules={[{ required: true, message: "გთხოვთ მიუთითოთ რაოდენობა" }]}
      >
        <Input type="number" min={1} placeholder="რაოდენობა" />
      </Form.Item>
      <Form.Item
        label="თარიღი"
        name="date"
        rules={[{ required: true, message: "გთხოვთ მიუთითოთ თარიღი" }]}
      >
        <DatePicker className="w-full" />
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
  );
};

export default DetailTaskForm;

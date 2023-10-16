/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh } from "@/context/actions/actionCreators";

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
}: SetOpenModal) => {
  const [form] = Form.useForm();
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch }: any = useGlobalContext();

  const onFinish = async (values: string) => {
    setisLoading(true);
    await API.post("restaurants/add-info", { values }).then((res) =>
      console.log(res)
    );
    setisLoading(false);
    setopenModal(false);
    dispatch(apiRefresh(!state.apiCallRefresh));
  };

  return (
    <div className="p-4 border-2 border-red-500">
      <Form
        layout="vertical"
        form={form}
        initialValues={{ layout: "vertical" }}
        onFinish={onFinish}
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

        <Form.Item className="w-full flex flex-row  justify-between items-center mt-10  border-2 border-red-500">
          <Button
            type="primary"
            danger
            ghost
            onClick={() => setopenModal(false)}
          >
            გამოსვლა
          </Button>

          <Button htmlType="submit" type="primary" ghost loading={isLoading}>
            დამატება
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RestaurantForm;

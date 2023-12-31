/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Button, Input, Space, message } from "antd";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh } from "@/context/actions/actionCreators";

type FieldType = {
  restaurantName?: string;
  ltdName?: string;
  city?: string;
  numberOfBoxes?: string;
};

type SetOpenModal = {
  setopenModal: any;
  setopenModal2: any;
  item: any;
};

const RestaurantForm: React.FC<SetOpenModal> = ({
  setopenModal,
  setopenModal2,
  item,
}: SetOpenModal) => {
  const [form] = Form.useForm();
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch }: any = useGlobalContext();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    if (item) {
      setisLoading(true);
      const updatedValues = { ...values, id: item.id };
      await API.post(`restaurants/edit-info/`, {
        updatedValues,
      })
        .then(() => {
          setopenModal2(false);
          dispatch(apiRefresh(!state.apiCallRefresh));
          form.resetFields();
        })
        .catch(() => error())
        .finally(() => setisLoading(false));
    } else {
      setisLoading(true);
      await API.post("restaurants/add-info", { values })
        .then(() => {
          setopenModal(false);
          dispatch(apiRefresh(!state.apiCallRefresh));
          form.resetFields();
        })
        .catch(() => error())
        .finally(() => setisLoading(false));
    }
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "დაფიქსირდა შეცდომა",
    });
  };

  return (
    <div className="p-4">
      {contextHolder}
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
          initialValue={item?.restaurantName}
          rules={[
            { required: true, message: "გთხოვთ მიუთითოთ რესტორნის სახელი!" },
          ]}
        >
          <Input placeholder="რესტორნის სახელი" />
        </Form.Item>

        <Form.Item<FieldType>
          label="შ.პ.ს სახელწოდება"
          name="ltdName"
          initialValue={item?.ltdName}
          rules={[
            { required: true, message: "გთხოვთ მიუთითოთ შ.პ.ს სახელწოდება!" },
          ]}
        >
          <Input placeholder="შ.პ.ს სახელწოდება" />
        </Form.Item>

        <Form.Item<FieldType>
          label="ქალაქი"
          name="city"
          initialValue={item?.city}
          rules={[{ required: true, message: "გთხოვთ მიუთითოთ ქალაქი!" }]}
        >
          <Input placeholder="ქალაქი" />
        </Form.Item>
        <Form.Item<FieldType>
          label="ყუთების რაოდენობა"
          name="numberOfBoxes"
          initialValue={item?.numberOfBoxes}
          rules={[
            { required: true, message: "გთხოვთ მიუთითოთ ყუთების რაოდენობა!" },
          ]}
        >
          <Input type="number" min={1} placeholder="ყუთების რაოდენობა" />
        </Form.Item>

        <Form.Item className="mt-10">
          <Space
            direction="horizontal"
            className="w-full flex flex-row  justify-between items-center"
          >
            <Button
              type="primary"
              danger
              ghost
              onClick={() =>
                item ? setopenModal2(false) : setopenModal(false)
              }
            >
              გამოსვლა
            </Button>

            <Button htmlType="submit" type="primary" ghost loading={isLoading}>
              დამატება
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RestaurantForm;

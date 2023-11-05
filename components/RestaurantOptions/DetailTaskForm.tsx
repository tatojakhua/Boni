/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Space, message } from "antd";
import API from "@/utils/API";
import { useParams } from "next/navigation";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh } from "@/context/actions/actionCreators";
import dayjs from "dayjs";

type SetOpenModal = {
  setopenModal: any;
  setopenModal2: any;
  data: any;
};

const DetailTaskForm: React.FC<SetOpenModal> = ({
  setopenModal,
  setopenModal2,
  data,
}: SetOpenModal) => {
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch }: any = useGlobalContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "დაფიქსირდა შეცდომა",
    });
  };

  const onFinish = async (values: string) => {
    if (data) {
      setisLoading(true);
      await API.put(`restaurant-details/edit-info/${data.id}`, { values })
        .then(() => {
          setopenModal2(false);
          dispatch(apiRefresh(!state.apiCallRefresh));
          form.resetFields();
        })
        .catch(() => error())
        .finally(() => setisLoading(false));
    } else {
      setisLoading(true);
      await API.post(`restaurant-details/${id}`, { values })
        .then(() => {
          setopenModal(false);
          dispatch(apiRefresh(!state.apiCallRefresh));
          form.resetFields();
        })
        .catch(() => error())
        .finally(() => setisLoading(false));
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="მძღოლის სახელი"
          name="driverName"
          initialValue={data?.driverName}
          rules={[
            { required: true, message: "გთხოვთ მიუთითოთ მძღოლის სახელი" },
          ]}
        >
          <Input placeholder="მძღოლის სახელი" />
        </Form.Item>
        <Form.Item
          label="ბოთლის სახეობა"
          name="typeOfBottle"
          initialValue={data?.typeOfBottle}
          rules={[
            { required: true, message: "გთხოვთ მიუთითოთ ბოთლის სახეობა" },
          ]}
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
          initialValue={data?.quantity}
          rules={[{ required: true, message: "გთხოვთ მიუთითოთ რაოდენობა" }]}
        >
          <Input type="number" min={1} placeholder="რაოდენობა" />
        </Form.Item>
        <Form.Item
          label="თარიღი"
          name="date"
          initialValue={data && dayjs(data?.date)}
          rules={[{ required: true, message: "გთხოვთ მიუთითოთ თარიღი" }]}
        >
          <DatePicker className="w-full" placeholder="თარიღი" />
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
                data ? setopenModal2(false) : setopenModal(false)
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
    </>
  );
};

export default DetailTaskForm;

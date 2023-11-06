/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { logIn } from "@/context/actions/actionCreators";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
};

const LogIn: React.FC = () => {
  const { dispatch }: any = useGlobalContext();
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const route = useRouter();
  const onFinish = async (values: any) => {
    setisLoading(true);
    setError(false);
    await API.post("auth/login", { values })
      .then((res) => {
        dispatch(logIn(res.data)), route.push("/restaurants");
      })
      .catch(() => {
        Error(),
          setError(true),
          setTimeout(() => {
            setError(false);
          }, 4000);
      })
      .finally(() => setisLoading(false));
  };
  const Error = () => {
    messageApi.open({
      type: "error",
      content: "მომხმარებლის სახელი ან პაროლი არასწორია",
    });
  };

  const onFinishFailed = () => {
    setError(true);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="p-16 rounded-3xl bg-gray-800 bg-opacity-30 hover:p-20 ease-in duration-300"
        style={{
          boxShadow: `${
            error
              ? "rgba(238, 25, 25, 0.403) 0px 30px 40px -7px"
              : "rgba(80, 115, 228, 0.403) 0px 30px 40px -7px"
          }`,
        }}
      >
        <Form.Item<FieldType>
          label="მოხმარებლის სახელი"
          name="username"
          rules={[{ required: true, message: "მიუთითეთ მომხმარებლის სახელი!" }]}
        >
          <Input placeholder="სახელი" />
        </Form.Item>

        <Form.Item<FieldType>
          label="პაროლი"
          name="password"
          rules={[{ required: true, message: "მიუთითეთ მომხმარებლის პაროლი!" }]}
        >
          <Input.Password
            style={{
              backgroundColor: "transparent",
            }}
            placeholder="პაროლი"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#1677ff] mt-10 px-8 ml-[-20px]"
            loading={isLoading}
          >
            შესვლა
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogIn;

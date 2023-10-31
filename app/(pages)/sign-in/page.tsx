/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
};

const HomePage: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="მოხმარებლის სახელი"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
        style={{
          color: "white",
          fontWeight: "600",
        }}
      >
        <Input
          style={{
            backgroundColor: "#B2C8BA",
            borderColor: "#1677ff",
            color: "white",
            fontWeight: "600",
          }}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="პაროლი"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        style={{
          color: "white",
          fontWeight: "600",
        }}
      >
        <Input.Password
          style={{
            backgroundColor: "#B2C8BA",
            borderColor: "#1677ff",
            color: "white",
            fontWeight: "600",
          }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default HomePage;

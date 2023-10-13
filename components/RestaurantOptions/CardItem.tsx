/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const CardItem = () => {
  const router = useRouter();
  return (
    <>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined
            key="setting"
            onClick={() => router.push(`/restaurants/${"1"}`)}
          />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
      <Card
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key={"delete"} />,
        ]}
      >
        <Meta title="რესტორანი 1" />
        <Meta description="შპს.რესტორანი 1" />
        <Meta description="თბილისი" />
      </Card>
    </>
  );
};

export default CardItem;

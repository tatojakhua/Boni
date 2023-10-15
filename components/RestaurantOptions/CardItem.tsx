/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh } from "@/context/actions/actionCreators";

const { Meta } = Card;
const CardItem = ({ item }: any) => {
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch } = useGlobalContext();
  const router = useRouter();

  const delateRetaurant = async (id: string) => {
    setisLoading(true);
    await API.delete(`/restaurants/delete-info/${id}`);
    setisLoading(false);
    dispatch(apiRefresh(!state.apiCallRefresh));
  };

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
            onClick={() => router.push(`/restaurants/${item.id}`)}
          />,
          <EditOutlined key="edit" />,
          isLoading ? (
            <div className="delete-loader"></div>
          ) : (
            <DeleteOutlined
              key={"delete"}
              onClick={() => delateRetaurant(item.id)}
            />
          ),
        ]}
      >
        <Meta title={item.restaurantName} />
        <Meta description={item.ltdName} />
        <Meta description={item.city} />
      </Card>
    </>
  );
};

export default CardItem;

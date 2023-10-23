/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, Modal } from "antd";
import { useRouter } from "next/navigation";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh } from "@/context/actions/actionCreators";
import RestaurantForm from "./RestaurantForm";

const { Meta } = Card;
const CardItem = ({ item, loading }: any) => {
  const [isLoading, setisLoading] = useState(false);
  const [openModal2, setopenModal2] = useState(false);
  const { state, dispatch }: any = useGlobalContext();
  const router = useRouter();

  const delateRetaurant = async (id: string) => {
    setisLoading(true);
    await API.delete(`/restaurants/delete-info/${id}`);
    setisLoading(false);
    dispatch(apiRefresh(!state.apiCallRefresh));
  };

  const editForm = () => {
    setopenModal2(true);
  };

  return (
    <>
      <Card
        style={{
          background:
            "linear-gradient( transparent, rgb(255 255 255 / 23%), rgb(91 91 91))",
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
          margin: "20px 10px",
          border: "none",
        }}
        loading={loading}
        actions={
          loading || [
            <SettingOutlined
              key="setting"
              onClick={() => router.push(`/restaurants/${item.id}`)}
            />,
            <EditOutlined key="edit" onClick={() => editForm()} />,
            isLoading ? (
              <div className="delete-loader"></div>
            ) : (
              <DeleteOutlined
                key={"delete"}
                onClick={() => delateRetaurant(item.id)}
              />
            ),
          ]
        }
      >
        <Meta title={item.restaurantName} />
        <Meta description={item.ltdName} />
        <div className="flex flex-row">
          <DeleteOutlined className="mr-2" />
          <Meta description={item.city} />
        </div>
        <Meta description={item.numberOfBoxes} />
      </Card>
      <Modal
        title="რესტორნის რედაქტირება"
        open={openModal2}
        onOk={() => setopenModal2(false)}
        onCancel={() => setopenModal2(false)}
        footer={false}
      >
        <RestaurantForm
          item={item}
          setopenModal2={setopenModal2}
          setopenModal={undefined}
        />
      </Modal>
    </>
  );
};

export default CardItem;

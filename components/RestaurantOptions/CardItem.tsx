/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, Modal } from "antd";
import { useRouter } from "next/navigation";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { IoLocationOutline } from "react-icons/io5";
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
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          background:
            "linear-gradient(#262626, rgb(144 144 144 / 23%), rgb(13 13 13))",
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
        <Meta title={item.restaurantName} style={{ marginBottom: "8px" }} />
        <div className="flex flex-row my-2">
          <span className="mr-2 text-white font-medium">შ.პ.ს:</span>
          <Meta description={item.ltdName} style={{ marginTop: "0.5px" }} />
        </div>
        <div className="flex flex-row my-2">
          <IoLocationOutline className="mr-2 text-white" />
          <Meta description={item.city} />
        </div>
        <div className="flex flex-row my-2">
          <InboxOutlined className="mr-2 text-white" />
          <Meta description={item.numberOfBoxes} />
        </div>
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

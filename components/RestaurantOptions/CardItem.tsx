/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, Modal, message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const delateRetaurant = async (id: string) => {
    setisLoading(true);
    await API.delete(`/restaurants/delete-info/${id}`)
      .then(() => dispatch(apiRefresh(!state.apiCallRefresh)))
      .catch(() => error())
      .finally(() => setisLoading(false));
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "დაფიქსირდა შეცდომა",
    });
  };

  const editForm = () => {
    setopenModal2(true);
  };
  return (
    <>
      {contextHolder}
      <Card
        className="w-[250px] bg-gray-800 bg-opacity-30 border-none m-6 cursor-pointer hover:mt-1 ease-in-out duration-300"
        style={{
          boxShadow: "rgba(80, 115, 228, 0.403) 0px 10px 30px -10px",
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

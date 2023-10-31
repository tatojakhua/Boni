/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import CardItem from "./CardItem";
import useFetchRestaurant from "../../hooks/useFetchRestaurant";
import { Input, Space, DatePicker, message, Button, Modal } from "antd";
import RestaurantForm from "@/components/RestaurantOptions/RestaurantForm";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh } from "@/context/actions/actionCreators";

const { Search } = Input;
const { RangePicker } = DatePicker;
const CardWrapper = () => {
  const { state, dispatch }: any = useGlobalContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setopenModal] = useState(false);
  const [BtnLoading, setBtnLoading] = useState(false);
  const [values, setValues] = useState({
    searchValue: "",
    dateRange: null,
  });
  const [Data, Error, isLoading]: any = useFetchRestaurant(values);
  if (Error) {
    return <h1>დაფიქსირდა შეცდომა</h1>;
  }
  const error = () => {
    messageApi.open({
      type: "error",
      content: "რეზულტატი ვერ მოიძებნა",
    });
  };
  const handleSetValues = (value: any) => {
    setValues({ ...values, searchValue: value.target.value });
  };
  const handleDataRange = (value: any) => {
    setValues({ ...values, dateRange: value });
  };
  const onSearch = async () => {
    setBtnLoading(true);
    await API.post("restaurants/search", { values })
      .then((res) => {
        if (res?.data?.length > 0) {
          dispatch(apiRefresh(!state.apiCallRefresh));
        } else {
          error();
        }
      })
      .catch(() => error())
      .finally(() => setBtnLoading(false));
  };

  return (
    <>
      <div className="relative flex flex-col sm:flex-row justify-center sm:justify-between items-center px-16 py-6">
        {contextHolder}
        <Space className="w-[50%] flex flex-col  justify-between items-center lg:flex-row">
          <Search
            placeholder="მოძებნე რესტორანი"
            onSearch={onSearch}
            onChange={handleSetValues}
            allowClear
            enterButton
            loading={isLoading || BtnLoading}
          />
          <RangePicker
            placeholder={["დასაწყისი", "დასასრული"]}
            onChange={handleDataRange}
          />
        </Space>
        <Button
          type="primary"
          ghost
          onClick={() => setopenModal(true)}
          style={{
            fontSize: "15px",
            height: "34px",
            padding: "4px 15px",
            fontWeight: 600,
            borderColor: "white",
            color: "white",
          }}
        >
          რესტორნის დამატება
        </Button>
        <Modal
          title="ახალი რესტორნის დამატება"
          open={openModal}
          onOk={() => setopenModal(false)}
          onCancel={() => setopenModal(false)}
          footer={false}
        >
          <RestaurantForm
            setopenModal={setopenModal}
            setopenModal2={undefined}
            item={undefined}
          />
        </Modal>
      </div>
      <div className="flex flex-row justify-around items-center flex-wrap p-6 my-10">
        {Data.map((item: any) => (
          <CardItem key={item.id} item={item} loading={isLoading} />
        ))}
      </div>
    </>
  );
};

export default CardWrapper;

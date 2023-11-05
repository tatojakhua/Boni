/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import CardItem from "./CardItem";
import useFetchRestaurant from "../../hooks/useFetchRestaurant";
import {
  Input,
  Space,
  DatePicker,
  message,
  Button,
  Modal,
  Empty,
  Tooltip,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import RestaurantForm from "@/components/RestaurantOptions/RestaurantForm";
import API from "@/utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import {
  apiRefresh,
  logout,
  setSearchData,
} from "@/context/actions/actionCreators";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Search } = Input;
const { RangePicker } = DatePicker;
const CardWrapper = () => {
  const route = useRouter();
  const { state, dispatch }: any = useGlobalContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setopenModal] = useState(false);
  const [BtnLoading, setBtnLoading] = useState(false);
  const [showBackBtn, setshowBackBtn] = useState(false);
  const [values, setValues] = useState({
    searchValue: "",
    dateRange: null,
  });
  const [Data, Error, isLoading]: any = useFetchRestaurant(values);

  const error = () => {
    messageApi.open({
      type: "error",
      content: "რეზულტატი ვერ მოიძებნა",
    });
  };
  const handleSetValues = (e: any) => {
    setValues({ ...values, searchValue: e.target.value });
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
          dispatch(setSearchData(true));
          setshowBackBtn(true);
        } else {
          error();
        }
      })
      .catch(() => error())
      .finally(() => setBtnLoading(false));
  };
  const handleBack = () => {
    dispatch(apiRefresh(!state.apiCallRefresh));
    setshowBackBtn(false);
    setValues({ dateRange: null, searchValue: "" });
  };
  const handleLogOut = async () => {
    await API.get("auth/logout")
      .then(() => {
        route.push("/sign-in"), dispatch(logout());
      })
      .catch(() => {
        error();
      });
  };
  if (Error) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <h1 className="text-white text-2xl mb-[100px]">
          დაფიქსირდა შეცდომა, შეამოწმეთ კავშირი ინტერნეტთან
        </h1>
        <Button type="primary" ghost onClick={() => window.location.reload()}>
          ხელმეორედ ცდა
        </Button>
      </div>
    );
  }
  return (
    <>
      <div className="relative flex flex-col sm:flex-row justify-center sm:justify-between items-center px-16 py-6">
        {contextHolder}
        <Space className="w-[50%] flex flex-col  justify-between items-center lg:flex-row">
          {showBackBtn && (
            <Button
              type="primary"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              style={{ background: "#1677ff" }}
              onClick={handleBack}
            />
          )}
          <Search
            placeholder="მოძებნე რესტორანი"
            onSearch={onSearch}
            onChange={handleSetValues}
            allowClear
            enterButton
            loading={BtnLoading}
            value={values.searchValue}
            className="mb-3 mt-9 min-w-[245px] lg:mb-0 lg:mt-0"
          />
          <RangePicker
            placeholder={["დასაწყისი", "დასასრული"]}
            onChange={handleDataRange}
            value={values.dateRange}
            className="min-w-[245px] mb-6 lg:mb-0"
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
          className="hover-button min-w-[245px] lg:min-w-[200px]"
        >
          რესტორნის დამატება
        </Button>
        <Tooltip title="გამოსვლა">
          <Button
            shape="circle"
            icon={<LogoutOutlined />}
            onClick={handleLogOut}
            style={{
              borderColor: "red",
              color: "red",
              boxShadow: "rgba(216, 0, 0, 1) 0px 2px 15px",
            }}
            className="absolute top-3 right-4 lg:relative lg:top-0 lg:right-0"
          />
        </Tooltip>
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
        {Data.length ? (
          Data.map((item: any) => (
            <CardItem key={item.id} item={item} loading={isLoading} />
          ))
        ) : isLoading ? (
          <div className="custom-loader mt-10" />
        ) : (
          <Empty description="ინფორმაცია ცარიელია" />
        )}
      </div>
    </>
  );
};

export default CardWrapper;

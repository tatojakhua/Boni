/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input, Space, DatePicker, message } from "antd";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh, setSearchData } from "@/context/actions/actionCreators";
import API from "@/utils/API";

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchOption: React.FC = () => {
  const { state, dispatch }: any = useGlobalContext();
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "რეზულტატი ვერ მოიძებნა",
    });
  };

  const onSearch = async (searchValue: string) => {
    await API.post("restaurants/search", { searchValue }).then((res) => {
      if (res?.data?.length > 0) {
        dispatch(setSearchData(res.data));
        dispatch(apiRefresh(!state.apiCallRefresh));
      } else {
        dispatch(setSearchData(res.data));
        error();
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Space className="w-[50%] flex flex-col  justify-between items-center lg:flex-row">
        <Search
          placeholder="მოძებნე რესტორანი"
          onSearch={onSearch}
          enterButton
        />
        <RangePicker placeholder={["დასაწყისი", "დასასრული"]} />
      </Space>
    </>
  );
};

export default SearchOption;

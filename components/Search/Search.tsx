/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Space, DatePicker } from "antd";
// import useFetchRestaurant from "@/hooks/useFetchRestaurant";
// import { useGlobalContext } from "@/context/global/GlobalContextProvider";
// import { apiRefresh } from "@/context/actions/actionCreators";

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchOption: React.FC = () => {
  // const { state, dispatch }: any = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");

  // useFetchRestaurant(searchValue);
  console.log(searchValue);
  const onSearch = async (value: string) => {
    setSearchValue(value);
    // dispatch(apiRefresh(!state.apiCallRefresh));
  };

  return (
    <Space className="w-[50%] flex flex-col  justify-between items-center lg:flex-row">
      <Search placeholder="მოძებნე რესტორანი" onSearch={onSearch} enterButton />
      <RangePicker />
    </Space>
  );
};

export default SearchOption;

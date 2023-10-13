/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input, Space, DatePicker } from "antd";
import type { SearchProps } from "../Search";

const { Search } = Input;
const { RangePicker } = DatePicker;

const onSearch: SearchProps["onSearch"] = (value: any) => console.log(value);

const SearchOption: React.FC = () => (
  <Space className="flex flex-col sm:flex-row border-2 border-blue-500">
    <Search placeholder="მოძებნე რესტორანი" onSearch={onSearch} enterButton />
    <RangePicker onChange={onSearch} />
  </Space>
);

export default SearchOption;

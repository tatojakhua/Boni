/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Input, Space, DatePicker } from "antd";
import type { SearchProps } from "../Search";
import { RangeValue } from "rc-picker/lib/interface";
import dayjs from "dayjs";

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchOption: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState<RangeValue<dayjs.Dayjs> | null>(
    null
  );

  const onSearch: SearchProps["onSearch"] = (value: any) => {
    const searchOptions = { searchValue, dateRange };
  };

  return (
    <Space className="flex flex-col sm:flex-row border-2 border-blue-500 bg-white text-black font-bold">
      <Search
        placeholder="მოძებნე რესტორანი"
        onSearch={(value) => {
          setSearchValue(value);
          onSearch(value);
        }}
        enterButton
      />
      <RangePicker
        onChange={(dates) => {
          onSearch(searchValue);
          setDateRange(dates);
        }}
      />
    </Space>
  );
};

export default SearchOption;

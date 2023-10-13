import React from "react";
import { Table, Popconfirm, Button } from "antd";

const RestaurantDetails = () => {
  const dataSource = [
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
    {
      driverName: "გია",
      typeOfBottle: "არგო",
      quantity: "123",
      date: "2023-10-13",
    },
  ];
  const defaultColumns = [
    {
      id: 1,
      title: "მძღოლის სახელი",
      dataIndex: "driverName",
      editable: true,
    },
    {
      id: 2,
      title: "ბოთლის ტიპი",
      dataIndex: "typeOfBottle",
      editable: true,
    },
    {
      id: 3,
      title: "რაოდენობა",
      dataIndex: "quantity",
      editable: true,
    },
    {
      id: 4,
      title: "თარიღი",
      dataIndex: "date",
      editable: true,
    },
    {
      id: 5,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="ნამდვილად გსურთ წაშლა?"
            onConfirm={() => console.log("delete")}
            okType="danger"
            okText="კი"
            cancelText="არა"
          >
            <Button danger size="small">
              წაშლა
            </Button>
          </Popconfirm>
        ) : null,
    },
    {
      id: 6,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="ნამდვილად გსურთ ცვლილება?"
            onConfirm={() => console.log("edit")}
            okType="danger"
            okText="კი"
            cancelText="არა"
          >
            <Button size="small" className="border-blue-600 text-blue-600">
              ცვლილება
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    return {
      key: col.id,
      ...col,
    };
  });
  return (
    <Table
      rowClassName={() => "editable-row"}
      bordered
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default RestaurantDetails;

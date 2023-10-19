/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Popconfirm, Button, Modal } from "antd";
import { useParams } from "next/navigation";
import useFetchDetails from "@/hooks/useFetchDetails";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiRefresh } from "@/context/actions/actionCreators";
import API from "@/utils/API";
import DetailTaskForm from "./DetailTaskForm";

const RestaurantDetails = () => {
  const [openModal2, setopenModal2] = useState(false);
  const [data, setdata] = useState([]);
  const { state, dispatch }: any = useGlobalContext();
  const { id } = useParams();
  const [dataSource, error, isLoading]: any = useFetchDetails(id);

  const handleDelete = async (id: any) => {
    await API.delete(`restaurant-details/delete-info/${id}`);
    dispatch(apiRefresh(!state.apiCallRefresh));
  };

  const handleChange = (data: any) => {
    setdata(data);
    setopenModal2(true);
  };

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
      render: (_: null, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="ნამდვილად გსურთ წაშლა?"
            onConfirm={() => handleDelete(record.id)}
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
      render: (_: null, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="ნამდვილად გსურთ ცვლილება?"
            onConfirm={() => handleChange(record)}
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

  if (error) {
    return <h1>error</h1>;
  }
  return (
    <>
      <Table
        rowClassName={() => "editable-row"}
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
      />
      <Modal
        title="ვიზიტის რედაქტირება"
        onOk={() => setopenModal2(false)}
        onCancel={() => setopenModal2(false)}
        open={openModal2}
        footer={false}
      >
        <DetailTaskForm
          setopenModal2={setopenModal2}
          data={data}
          setopenModal={undefined}
        />
      </Modal>
    </>
  );
};
export default RestaurantDetails;

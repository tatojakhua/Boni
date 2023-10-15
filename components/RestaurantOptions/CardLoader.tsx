import React from "react";
import { Card } from "antd";

const CardLoader = () => (
  <Card
    style={{
      width: 300,
      marginBottom: "70px",
    }}
    loading={true}
  />
);
export default CardLoader;

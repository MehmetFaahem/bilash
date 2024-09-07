"use client";

import { Card, Col, Row } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  StarOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const countData = [
  {
    title: "Products",
    count: 120,
    icon: <AppstoreOutlined style={{ fontSize: "24px", color: "#08c" }} />,
  },
  {
    title: "Customers",
    count: 80,
    icon: <UserOutlined style={{ fontSize: "24px", color: "#08c" }} />,
  },
  {
    title: "Orders",
    count: 150,
    icon: <ShoppingCartOutlined style={{ fontSize: "24px", color: "#08c" }} />,
  },
  {
    title: "Sellers",
    count: 40,
    icon: <ShopOutlined style={{ fontSize: "24px", color: "#08c" }} />,
  },
  {
    title: "Reviews",
    count: 200,
    icon: <StarOutlined style={{ fontSize: "24px", color: "#08c" }} />,
  },
  {
    title: "Advertisements",
    count: 10,
    icon: <NotificationOutlined style={{ fontSize: "24px", color: "#08c" }} />,
  },
];

const CountCards = () => {
  return (
    <div className="flex flex-wrap -mx-2">
      {countData.map((data, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
          <Card>
            <Card.Meta
              avatar={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {data.icon}
                </div>
              }
              title={data.title}
              description={`Total: ${data.count}`}
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CountCards;

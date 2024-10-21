"use client";

import React from "react";
import { Layout, Input, Select, Button } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
const { Header: AntHeader } = Layout;
const { Search } = Input;
import logo from "@/public/images/logo.png";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#1a136e",
  },
};

const HeaderComponent = () => {
  return (
    <ConfigProvider theme={theme}>
      <AntHeader
        style={{
          background: "#fff",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            icon={<MenuOutlined />}
            type="text"
            style={{ marginRight: "0px" }}
          />
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={40}
            className="w-full"
          />
        </div>
        <Search
          placeholder="Search..."
          onSearch={(value) => console.log(value)}
          style={{ width: "50%" }}
          prefix={<SearchOutlined />}
          size="large"
        />

        <div className="hidden lg:block w-[30%]">
          <Select
            style={{ width: "100%" }}
            placeholder="Select location"
            prefix={<EnvironmentOutlined />}
            size="large"
            className="hidden md:block"
          >
            <Select.Option value="location1">Location 1</Select.Option>
            <Select.Option value="location2">Location 2</Select.Option>
          </Select>
        </div>

        <div className="hidden md:block">
          <Button type="primary" icon={<UserOutlined />} size="large">
            Login
          </Button>
        </div>
      </AntHeader>
    </ConfigProvider>
  );
};

export default HeaderComponent;

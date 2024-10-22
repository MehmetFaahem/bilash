"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Layout,
  Input,
  Select,
  Button,
  Drawer,
  Menu,
  Tour,
  Modal,
  Popover,
} from "antd";
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
    controlOutline: "none",
  },
};

const generateCategories = () => {
  const categories = [];
  for (let i = 1; i <= 30; i++) {
    categories.push({
      key: `category-${i}`,
      label: `Category ${i}`,
      children: [
        { key: `sub-${i}-1`, label: `Subcategory ${i}-1` },
        { key: `sub-${i}-2`, label: `Subcategory ${i}-2` },
        { key: `sub-${i}-3`, label: `Subcategory ${i}-3` },
      ],
    });
  }
  return categories;
};

const CategoryMenu = () => {
  const categories = generateCategories();

  return (
    <Menu
      mode="inline"
      items={categories}
      style={{
        width: "100%",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "hidden",
      }}
    />
  );
};

const HeaderComponent = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobilePopover, setIsMobilePopover] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const locationRef = useRef(null);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
    setIsMobilePopover(false);
  };

  const steps = [
    {
      title: "Menu",
      description: "Please select a category to see the subcategories",
      target: () => menuRef.current,
    },
    {
      title: "Search",
      description: "Search any product, service or category",
      target: () => searchRef.current,
    },
    {
      title: "Location",
      description: "Select your location",
      target: () => locationRef.current,
    },
  ];

  useEffect(() => {
    // Delay the tour start to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      if (menuRef.current && searchRef.current && locationRef.current) {
        setOpen(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ConfigProvider theme={theme}>
        <AntHeader
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            height: "64px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              icon={<MenuOutlined />}
              type="text"
              style={{ marginRight: "0px" }}
              onClick={showDrawer}
              ref={menuRef}
            />
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={40}
              className="w-full"
            />
          </div>
          <div ref={searchRef} className="flex items-center gap-4 w-[50%] ">
            <Search
              placeholder="Search..."
              onSearch={(value) => console.log(value)}
              style={{ width: "100%" }}
              prefix={<SearchOutlined />}
              size="large"
              onClick={() => {
                if (window.innerWidth < 768) {
                  showModal();
                }
              }}
            />
          </div>

          <div
            ref={locationRef}
            className="w-auto lg:w-[30%] flex items-center lg:mx-4"
          >
            <Popover
              open={isMobilePopover}
              content={
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select location"
                  prefix={<EnvironmentOutlined />}
                  size="large"
                  className="hidden md:block"
                  onChange={(value) => {
                    getLocation();
                  }}
                >
                  <Select.Option value="location1">
                    Take My Location
                  </Select.Option>
                  <Select.Option value="location2">Location 2</Select.Option>
                </Select>
              }
            >
              <div
                className="flex mx-4 lg:ml-0 lg:mr-2"
                onClick={() => {
                  setIsMobilePopover(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#1a136e"
                  viewBox="0 0 256 256"
                >
                  <path d="M200,224H150.54A266.56,266.56,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25a88,88,0,0,0-176,0c0,31.4,14.51,64.68,42,96.25A266.56,266.56,0,0,0,105.46,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM128,72a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                </svg>
              </div>
            </Popover>
            <div className="hidden lg:block w-[100%]">
              <Select
                style={{ width: "100%" }}
                placeholder="Select location"
                prefix={<EnvironmentOutlined />}
                size="large"
                className="hidden md:block"
              >
                <Select.Option value="location1">
                  Take My Location
                </Select.Option>
                <Select.Option value="location2">Location 2</Select.Option>
              </Select>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outlined"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM56,146.87C36.41,141.4,24,132.39,24,124V109.93c8.16,5.78,19.09,10.44,32,13.57Zm80-23.37c12.91-3.13,23.84-7.79,32-13.57V124c0,8.39-12.41,17.4-32,22.87Zm-16,71.37C100.41,189.4,88,180.39,88,172v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41Zm0-44.62A163,163,0,0,1,96,152a163,163,0,0,1-24-1.75V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54Zm64,48a165.45,165.45,0,0,1-48,0V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54ZM232,172c0,8.39-12.41,17.4-32,22.87V171.5c12.91-3.13,23.84-7.79,32-13.57Z"></path>
                </svg>
              }
              size="large"
            >
              Become a seller
            </Button>
            <Button type="primary" icon={<UserOutlined />} size="large">
              Login
            </Button>
          </div>
        </AntHeader>
        <Drawer
          title="Categories"
          placement="left"
          onClose={onCloseDrawer}
          open={drawerVisible}
          width={300}
        >
          <CategoryMenu />
        </Drawer>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        <Modal
          title="Search"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Search
            placeholder="Search..."
            onSearch={(value) => console.log(value)}
            style={{ width: "100%" }}
            prefix={<SearchOutlined />}
            size="large"
          />
          <div className="flex justify-center items-center h-[400px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 80 80"
            >
              <path
                fill="#b6c9d6"
                stroke="#788b9c"
                stroke-miterlimit="10"
                d="M9.6,74.6c-1.1,0-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2,0-5.9l34-32.4l4.3,4.3l-32.4,34	C11.7,74.2,10.7,74.6,9.6,74.6z"
              ></path>
              <path
                fill="#d1edff"
                stroke="#788b9c"
                stroke-miterlimit="10"
                d="M51.1,52.4c-13,0-23.5-10.5-23.5-23.5S38.1,5.4,51.1,5.4S74.6,16,74.6,28.9S64,52.4,51.1,52.4z"
              ></path>
            </svg>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default HeaderComponent;

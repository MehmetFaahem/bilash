"use client";

import { Layout, Menu, Grid } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  PlusOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  NotificationOutlined,
  PercentageOutlined,
  DollarOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    if (screens.xs) {
      setCollapsed(true);
    }
  }, [screens]);

  const handleNavigation = (e) => {
    router.push(e.key);
  };

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        style={{ position: "fixed", height: "100vh", overflow: "auto" }}
      >
        <Menu theme="dark" mode="inline" onClick={handleNavigation}>
          {[
            {
              key: "/admin/dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
          ].map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
          <SubMenu key="products" icon={<AppstoreOutlined />} title="Products">
            <Menu.Item key="/admin/products">All Products</Menu.Item>
            <Menu.Item key="/admin/products/add" icon={<PlusOutlined />}>
              Add Products
            </Menu.Item>
          </SubMenu>
          <SubMenu key="places" icon={<EnvironmentOutlined />} title="Places">
            <Menu.Item key="/admin/places">All Places</Menu.Item>
            <Menu.Item key="/admin/sub-places">Sub Places</Menu.Item>
            <Menu.Item key="/admin/sub-of-sub-places">
              Sub of Sub Places
            </Menu.Item>
          </SubMenu>
          {[
            {
              key: "/admin/categories",
              icon: <TagsOutlined />,
              label: "Categories",
            },
            {
              key: "/admin/sub-categories",
              icon: <TagsOutlined />,
              label: "Sub Categories",
            },
            {
              key: "/admin/customers",
              icon: <UserOutlined />,
              label: "Customers",
            },
            {
              key: "/admin/orders",
              icon: <ShoppingCartOutlined />,
              label: "Orders",
            },
            { key: "/admin/sellers", icon: <ShopOutlined />, label: "Sellers" },
            {
              key: "/admin/advertisements",
              icon: <NotificationOutlined />,
              label: "Advertisements",
            },
            {
              key: "/admin/discounts",
              icon: <PercentageOutlined />,
              label: "Discounts",
            },
            { key: "/admin/tokens", icon: <DollarOutlined />, label: "Tokens" },
            { key: "/admin/reviews", icon: <StarOutlined />, label: "Reviews" },
            {
              key: "/admin/messages",
              icon: <MessageOutlined />,
              label: "Messages",
            },
          ].map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content style={{ margin: "16px", padding: "0 24px" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

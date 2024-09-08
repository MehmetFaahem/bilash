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
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
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
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleNavigation}
          selectedKeys={[pathname]}
        >
          {[
            {
              key: "/admin/dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
          ].map((item) => (
            <Menu.Item
              style={{
                backgroundColor: pathname === item.key ? "#006ed6" : "",
              }}
              key={item.key}
              icon={item.icon}
            >
              {item.label}
            </Menu.Item>
          ))}
          <SubMenu
            key="products"
            icon={<AppstoreOutlined />}
            title="Products"
            style={{
              backgroundColor: pathname.startsWith("/admin/products")
                ? "#006ed6"
                : "",
            }}
          >
            <Menu.Item
              style={{
                backgroundColor:
                  pathname === "/admin/products" ? "#006ed6" : "",
              }}
              key="/admin/products"
            >
              All Products
            </Menu.Item>
            <Menu.Item
              style={{
                backgroundColor:
                  pathname === "/admin/products/add" ? "#006ed6" : "",
              }}
              key="/admin/products/add"
              icon={<PlusOutlined />}
            >
              Add Products
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="places"
            icon={<EnvironmentOutlined />}
            title="Places"
            style={{
              backgroundColor: pathname.startsWith("/admin/places")
                ? "#006ed6"
                : "",
            }}
          >
            <Menu.Item
              style={{
                backgroundColor: pathname === "/admin/places" ? "#006ed6" : "",
              }}
              key="/admin/places"
            >
              All Places
            </Menu.Item>
            <Menu.Item
              style={{
                backgroundColor:
                  pathname === "/admin/places/sub-places" ? "#006ed6" : "",
              }}
              key="/admin/places/sub-places"
            >
              Sub Places
            </Menu.Item>
          </SubMenu>
          {[
            {
              key: "/admin/categories",
              icon: <TagsOutlined />,
              label: "Categories",
            },
            {
              key: "/admin/categories/sub-categories",
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

            { key: "/admin/tokens", icon: <DollarOutlined />, label: "Tokens" },
            { key: "/admin/reviews", icon: <StarOutlined />, label: "Reviews" },
            {
              key: "/admin/messages",
              icon: <MessageOutlined />,
              label: "Messages",
            },
          ].map((item) => (
            <Menu.Item
              style={{
                backgroundColor: pathname === item.key ? "#006ed6" : "",
              }}
              key={item.key}
              icon={item.icon}
            >
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

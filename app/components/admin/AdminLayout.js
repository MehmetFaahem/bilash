"use client";
import { Layout, Menu, Grid } from "antd";
import Link from "next/link";
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
import { useState, useEffect, useCallback, memo } from "react";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const MemoizedMenuItem = memo(({ item, pathname }) => (
  <Menu.Item
    style={{
      backgroundColor: pathname === item.key ? "#006ed6" : "",
    }}
    key={item.key}
    icon={item.icon}
  >
    <Link href={item.key}>{item.label}</Link>
  </Menu.Item>
));

MemoizedMenuItem.displayName = "MemoizedMenuItem";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    const handleResize = () => {
      if (screens.xs) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screens.xs]);

  const handleNavigation = useCallback(
    (e) => {
      router.push(e.key);
    },
    [router]
  );

  const renderMenuItem = useCallback(
    (item) => (
      <MemoizedMenuItem key={item.key} item={item} pathname={pathname} />
    ),
    [pathname]
  );

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={useCallback((value) => setCollapsed(value), [])}
        style={{ position: "fixed", height: "100vh", overflow: "auto" }}
      >
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleNavigation}
          selectedKeys={[pathname]}
        >
          {renderMenuItem({
            key: "/admin/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          })}
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
            {renderMenuItem({
              key: "/admin/products",
              label: "All Products",
            })}
            {renderMenuItem({
              key: "/admin/products/add",
              icon: <PlusOutlined />,
              label: "Add Products",
            })}
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
            {renderMenuItem({
              key: "/admin/places",
              label: "All Places",
            })}
            {renderMenuItem({
              key: "/admin/places/sub-places",
              label: "Sub Places",
            })}
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
          ].map(renderMenuItem)}
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

export default memo(AdminLayout);

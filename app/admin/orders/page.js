"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Tabs,
  Tag,
} from "antd";
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const Orders = () => {
  // State variables
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      // Example static data
      const ordersData = [
        {
          key: "1",
          orderId: "1001",
          date: "2023-01-01",
          customerName: "John Doe",
          address: "123 Main St",
          contact: "123-456-7890",
          items: [
            { name: "Item 1", quantity: 2, price: 10 },
            { name: "Item 2", quantity: 1, price: 20 },
          ],
          status: "delivered",
        },
        {
          key: "2",
          orderId: "1002",
          date: "2023-01-02",
          customerName: "Jane Smith",
          address: "456 Elm St",
          contact: "987-654-3210",
          items: [
            { name: "Item 3", quantity: 1, price: 15 },
            { name: "Item 4", quantity: 4, price: 5 },
          ],
          status: "pending",
        },
      ];

      setOrders(ordersData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Show modal for order details
  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // Handle cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  // Handle delete action
  const handleDelete = (key) => {
    const updatedOrders = orders.filter((order) => order.key !== key);
    setOrders(updatedOrders);
    message.success("Order deleted successfully");
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Handle marking order as delivered
  const handleDeliver = (key) => {
    const updatedOrders = orders.map((order) =>
      order.key === key ? { ...order, status: "delivered" } : order
    );
    setOrders(updatedOrders);
    message.success("Order marked as delivered");
  };

  // Handle marking order as cancelled
  const handleCancelOrder = (key) => {
    const updatedOrders = orders.map((order) =>
      order.key === key ? { ...order, status: "cancelled" } : order
    );
    setOrders(updatedOrders);
    message.success("Order marked as cancelled");
  };

  // Filter orders based on search text
  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Filter orders based on active tab
  const tabFilteredOrders = filteredOrders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  // Define columns for the table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "delivered"
              ? "green"
              : status === "pending"
              ? "blue"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: () => <div style={{ textAlign: "right" }}>Actions</div>,
      key: "actions",
      render: (_, record) => (
        <Space
          size="middle"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
            style={{ backgroundColor: "#001529", color: "white" }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            style={{ backgroundColor: "red", color: "white" }} // Theme updated to red
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      <div className="flex justify-between items-center place-items-center">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="All Orders" key="all" />
          <Tabs.TabPane tab="Delivered Orders" key="delivered" />
          <Tabs.TabPane tab="Cancelled Orders" key="cancelled" />
        </Tabs>
        <Input
          placeholder="Search orders"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={tabFilteredOrders}
        loading={loading}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={() => handleCancelOrder(selectedOrder.key)}
          >
            Cancel
          </Button>,
          <Button
            key="deliver"
            type="primary"
            onClick={() => handleDeliver(selectedOrder.key)}
          >
            Deliver
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Contact:</strong> {selectedOrder.contact}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total Price:</strong> $
              {selectedOrder.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Orders;

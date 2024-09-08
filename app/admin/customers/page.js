"use client";

// Import necessary libraries and components
import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const Customers = () => {
  // State to store customers data
  const [customers, setCustomers] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store the selected customer details
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customers data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data for customers
      const customersData = [
        {
          key: "1",
          name: "Customer 1",
          email: "customer1@example.com",
          phone: "123-456-7890",
          purchases: 5,
          description: "Description for Customer 1",
        },
        {
          key: "2",
          name: "Customer 2",
          email: "customer2@example.com",
          phone: "098-765-4321",
          purchases: 3,
          description: "Description for Customer 2",
        },
      ];

      // Set customers data and update loading status
      setCustomers(customersData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to show modal with customer details
  const showModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
  };

  // Function to handle customer deletion
  const handleDelete = (key) => {
    const updatedCustomers = customers.filter(
      (customer) => customer.key !== key
    );
    setCustomers(updatedCustomers);
    message.success("Customer deleted successfully");
  };

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Purchases",
      dataIndex: "purchases",
      key: "purchases",
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
            style={{ backgroundColor: "red", color: "white" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>
      <Table
        columns={columns}
        dataSource={customers}
        loading={loading}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title="Customer Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedCustomer && (
          <div>
            <p>
              <strong>Name:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCustomer.phone}
            </p>
            <p>
              <strong>Purchases:</strong> {selectedCustomer.purchases}
            </p>
            <p>
              <strong>Description:</strong> {selectedCustomer.description}
            </p>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Customers;

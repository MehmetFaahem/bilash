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
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const Tokens = () => {
  // State to store tokens data
  const [tokens, setTokens] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store the token being edited
  const [editingToken, setEditingToken] = useState(null);
  // State to store customers data
  const [customers, setCustomers] = useState([]);
  // Form instance for the modal form
  const [form] = Form.useForm();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data for tokens
      const tokensData = [
        { key: "1", name: "Token 1", value: "100", customer: "Customer 1" },
        { key: "2", name: "Token 2", value: "200", customer: "Customer 2" },
        { key: "3", name: "Token 3", value: "300", customer: "Customer 3" },
      ];

      // Example static data for customers
      const customersData = [
        { key: "1", name: "Customer 1" },
        { key: "2", name: "Customer 2" },
        { key: "3", name: "Customer 3" },
      ];

      // Set tokens and customers data to state
      setTokens(tokensData);
      setCustomers(customersData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to show modal for adding/editing token
  const showModal = (token) => {
    setEditingToken(token);
    if (token) {
      form.setFieldsValue(token);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingToken(null);
    form.resetFields();
  };

  // Function to handle form submission
  const onFinish = (values) => {
    if (editingToken) {
      // Update existing token
      const updatedTokens = tokens.map((token) =>
        token.key === editingToken.key ? { ...token, ...values } : token
      );
      setTokens(updatedTokens);
      message.success("Token updated successfully");
    } else {
      // Add new token
      const newToken = { key: Date.now().toString(), ...values };
      setTokens([...tokens, newToken]);
      message.success("Token added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle token deletion
  const handleDelete = (key) => {
    const updatedTokens = tokens.filter((token) => token.key !== key);
    setTokens(updatedTokens);
    message.success("Token deleted successfully");
  };

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
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
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ backgroundColor: "#001529", color: "white" }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            style={{ backgroundColor: "red", color: "white" }} // Updated delete button color to red
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tokens</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ backgroundColor: "#001529", color: "white" }}
        >
          Add New Token
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={tokens}
        loading={loading}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 16 }}
      />
      <Modal
        title={editingToken ? "Edit Token" : "Add New Token"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Token Name"
            rules={[
              { required: true, message: "Please input the token name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label="Token Value"
            rules={[
              { required: true, message: "Please input the token value!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Customer"
            rules={[{ required: true, message: "Please select a customer!" }]}
          >
            <Select>
              {customers.map((customer) => (
                <Select.Option key={customer.key} value={customer.name}>
                  {customer.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Tokens;

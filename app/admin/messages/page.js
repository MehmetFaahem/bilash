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
  Tag,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const Messages = () => {
  // State variables to manage messages, loading state, modal visibility, and form
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewingMessage, setViewingMessage] = useState(null);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  // Fetch messages data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Example static data for messages
      const messagesData = [
        {
          key: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          message: "Hello, I need help with my order.",
          status: "replied",
        },
        {
          key: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "987-654-3210",
          message: "Can you provide more information about your product?",
          status: "non replied",
        },
      ];

      setMessages(messagesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Show modal to view message details
  const showViewModal = (message) => {
    setViewingMessage(message);
    setIsModalVisible(true);
  };

  // Handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setViewingMessage(null);
    form.resetFields();
  };

  // Handle reply action and update message status
  const handleReply = (values) => {
    const updatedMessages = messages.map((msg) =>
      msg.key === viewingMessage.key
        ? { ...msg, status: "replied", reply: values.reply }
        : msg
    );
    setMessages(updatedMessages);
    message.success("Reply sent successfully");
    setIsModalVisible(false);
    setViewingMessage(null);
    form.resetFields();
  };

  // Handle delete action and remove message from list
  const handleDelete = (key) => {
    const updatedMessages = messages.filter((msg) => msg.key !== key);
    setMessages(updatedMessages);
    message.success("Message deleted successfully");
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // Filter messages based on search text and selected filter
  const filteredMessages = messages.filter((msg) => {
    if (filter !== "all" && msg.status !== filter) return false;
    if (
      msg.name.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.phone.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

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
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "replied" ? "green" : "red"}>{status}</Tag>
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
            onClick={() => showViewModal(record)}
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
        <h1 className="text-2xl font-bold">Messages</h1>
        <div className="flex items-center">
          <Input
            placeholder="Search messages"
            value={searchText}
            onChange={handleSearch}
            style={{ marginRight: 16 }}
            prefix={<SearchOutlined />}
          />
          <Select
            defaultValue="all"
            onChange={handleFilterChange}
            style={{ width: 200 }}
          >
            <Select.Option value="all">All Messages</Select.Option>
            <Select.Option value="replied">Replied</Select.Option>
            <Select.Option value="non replied">Non Replied</Select.Option>
          </Select>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredMessages}
        loading={loading}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 16 }}
      />
      <Modal
        title="View Message"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reply"
            type="primary"
            onClick={() => form.submit()}
            style={{ backgroundColor: "#001529", color: "white" }}
          >
            Reply
          </Button>,
        ]}
      >
        {viewingMessage && (
          <div>
            <p>
              <strong>Name:</strong> {viewingMessage.name}
            </p>
            <p>
              <strong>Email:</strong> {viewingMessage.email}
            </p>
            <p>
              <strong>Phone:</strong> {viewingMessage.phone}
            </p>
            <p>
              <strong>Message:</strong> {viewingMessage.message}
            </p>
            <p>
              <strong>Status:</strong> {viewingMessage.status}
            </p>
            <Form form={form} layout="vertical" onFinish={handleReply}>
              <Form.Item
                name="reply"
                label="Reply"
                rules={[
                  { required: true, message: "Please input your reply!" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Messages;

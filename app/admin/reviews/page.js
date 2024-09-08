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

const Reviews = () => {
  // State to store reviews data
  const [reviews, setReviews] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store the review being viewed
  const [viewingReview, setViewingReview] = useState(null);
  // Form instance for handling form operations
  const [form] = Form.useForm();
  // State to manage filter option
  const [filter, setFilter] = useState("all");
  // State to manage search text
  const [searchText, setSearchText] = useState("");

  // Fetch reviews data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data for reviews
      const reviewsData = [
        {
          key: "1",
          name: "John Doe",
          email: "john@example.com",
          product: "Product 1",
          review: "Great product!",
          status: "replied",
        },
        {
          key: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          product: "Product 2",
          review: "Not bad.",
          status: "non replied",
        },
        {
          key: "3",
          name: "Alice Johnson",
          email: "alice@example.com",
          product: "Product 3",
          review: "Could be better.",
          status: "replied",
        },
      ];

      setReviews(reviewsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to show the modal with review details
  const showViewModal = (review) => {
    setViewingReview(review);
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setViewingReview(null);
    form.resetFields();
  };

  // Function to handle review deletion
  const handleDelete = (key) => {
    const updatedReviews = reviews.filter((review) => review.key !== key);
    setReviews(updatedReviews);
    message.success("Review deleted successfully");
  };

  // Function to handle filter change
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Function to handle reply submission
  const handleReply = (values) => {
    const updatedReviews = reviews.map((review) =>
      review.key === viewingReview.key
        ? { ...review, status: "replied", reply: values.reply }
        : review
    );
    setReviews(updatedReviews);
    message.success("Reply sent successfully");
    setIsModalVisible(false);
    setViewingReview(null);
    form.resetFields();
  };

  // Filter reviews based on filter and search text
  const filteredReviews = reviews.filter((review) => {
    if (filter !== "all" && review.status !== filter) return false;
    if (
      review.name.toLowerCase().includes(searchText.toLowerCase()) ||
      review.email.toLowerCase().includes(searchText.toLowerCase()) ||
      review.product.toLowerCase().includes(searchText.toLowerCase()) ||
      review.review.toLowerCase().includes(searchText.toLowerCase())
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
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
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
            style={{ backgroundColor: "red", color: "white" }} // Updated button theme to red
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <div className="flex items-center">
          <Input
            placeholder="Search reviews"
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
            <Select.Option value="all">All Reviews</Select.Option>
            <Select.Option value="replied">Replied</Select.Option>
            <Select.Option value="non replied">Non Replied</Select.Option>
          </Select>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredReviews}
        loading={loading}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 16 }}
      />
      <Modal
        title="View Review"
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
        {viewingReview && (
          <div>
            <p>
              <strong>Name:</strong> {viewingReview.name}
            </p>
            <p>
              <strong>Email:</strong> {viewingReview.email}
            </p>
            <p>
              <strong>Product:</strong> {viewingReview.product}
            </p>
            <p>
              <strong>Review:</strong> {viewingReview.review}
            </p>
            <p>
              <strong>Status:</strong> {viewingReview.status}
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

export default Reviews;

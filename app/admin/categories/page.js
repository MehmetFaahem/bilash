"use client";

// Import necessary libraries and components
import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import {
  DownOutlined,
  RightOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const Categories = () => {
  // State to store categories data
  const [categories, setCategories] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage expanded rows in the table
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store the category being edited
  const [editingCategory, setEditingCategory] = useState(null);
  // Form instance for the modal form
  const [form] = Form.useForm();

  // Fetch categories data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data for categories
      const categoriesData = [
        {
          key: "1",
          name: "Category 1",
          subCategories: [
            { key: "1-1", name: "Sub Category 1-1" },
            { key: "1-2", name: "Sub Category 1-2" },
          ],
        },
        {
          key: "2",
          name: "Category 2",
          subCategories: [{ key: "2-1", name: "Sub Category 2-1" }],
        },
      ];

      setCategories(categoriesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to handle row expansion in the table
  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  // Function to show modal for adding/editing category
  const showModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  // Function to handle form submission
  const onFinish = (values) => {
    if (editingCategory) {
      // Update existing category
      const updatedCategories = categories.map((category) =>
        category.key === editingCategory.key
          ? { ...category, ...values }
          : category
      );
      setCategories(updatedCategories);
      message.success("Category updated successfully");
    } else {
      // Add new category
      const newCategory = {
        key: Date.now().toString(),
        ...values,
        subCategories: [],
      };
      setCategories([...categories, newCategory]);
      message.success("Category added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle category deletion
  const handleDelete = (key) => {
    const updatedCategories = categories.filter(
      (category) => category.key !== key
    );
    setCategories(updatedCategories);
    message.success("Category deleted successfully");
  };

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: () => <div style={{ textAlign: "right" }}>Actions</div>,
      key: "actions",
      width: "50%",
      render: (_, record) => (
        <Space
          size="middle"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            icon={
              expandedRowKeys.includes(record.key) ? (
                <DownOutlined />
              ) : (
                <RightOutlined />
              )
            }
            onClick={() =>
              handleExpand(!expandedRowKeys.includes(record.key), record)
            }
            style={{ backgroundColor: "#001529", color: "white" }}
          />
          <Button
            icon={<EditOutlined />}
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

  // Define expanded row render for sub-categories
  const expandedRowRender = (record) => {
    const subColumns = [
      {
        title: "Sub Category Name",
        dataIndex: "name",
        key: "name",
        width: "50%",
      },
      {
        title: () => <div style={{ textAlign: "right" }}>Actions</div>,
        key: "actions",
        width: "50%",
        render: (_, subRecord) => (
          <Space
            size="middle"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              icon={<EditOutlined />}
              onClick={() => showModal(subRecord)}
              style={{ backgroundColor: "#001529", color: "white" }}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(subRecord.key)}
              style={{ backgroundColor: "red", color: "white" }}
            />
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={subColumns}
        dataSource={record.subCategories}
        pagination={false}
        rowKey="key"
      />
    );
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ backgroundColor: "#001529" }}
        >
          Add New Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: handleExpand,
        }}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title={editingCategory ? "Edit Category" : "Add New Category"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Categories;

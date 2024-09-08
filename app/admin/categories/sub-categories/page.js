"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      // Example static data
      const categoriesData = [
        {
          key: "1",
          name: "Category 1",
          subCategories: [
            { key: "1-1", name: "Sub Category 1-1", category: "Category 1" },
            { key: "1-2", name: "Sub Category 1-2", category: "Category 1" },
          ],
        },
        {
          key: "2",
          name: "Category 2",
          subCategories: [
            { key: "2-1", name: "Sub Category 2-1", category: "Category 2" },
          ],
        },
      ];

      const subCategoriesData = categoriesData.flatMap(
        (category) => category.subCategories
      );

      setCategories(categoriesData);
      setSubCategories(subCategoriesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const showModal = (subCategory = null) => {
    setEditingSubCategory(subCategory);
    if (subCategory) {
      form.setFieldsValue(subCategory);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingSubCategory(null);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (editingSubCategory) {
      // Update existing sub category
      const updatedSubCategories = subCategories.map((subCategory) =>
        subCategory.key === editingSubCategory.key
          ? { ...subCategory, ...values }
          : subCategory
      );
      setSubCategories(updatedSubCategories);
      message.success("Sub Category updated successfully");
    } else {
      // Add new sub category
      const newSubCategory = {
        key: Date.now().toString(),
        ...values,
      };
      setSubCategories([...subCategories, newSubCategory]);
      message.success("Sub Category added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (key) => {
    const updatedSubCategories = subCategories.filter(
      (subCategory) => subCategory.key !== key
    );
    setSubCategories(updatedSubCategories);
    message.success("Sub Category deleted successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
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
            style={{ backgroundColor: "red", color: "white" }} // Theme updated to red
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sub Categories</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{
            marginBottom: 16,
            backgroundColor: "#001529",
            color: "white",
          }}
        >
          Add New Sub Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={subCategories}
        loading={loading}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title={
          editingSubCategory ? "Edit Sub Category" : "Add New Sub Category"
        }
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
                message: "Please input the name of the sub category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please select the parent category!" },
            ]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.key} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default SubCategories;

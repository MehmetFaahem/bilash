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

const SubPlaces = () => {
  // State to store sub-places data
  const [subPlaces, setSubPlaces] = useState([]);
  // State to store places data
  const [places, setPlaces] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to manage the currently editing sub-place
  const [editingSubPlace, setEditingSubPlace] = useState(null);
  // Form instance for the modal form
  const [form] = Form.useForm();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data
      const placesData = [
        {
          key: "1",
          name: "Place 1",
          subPlaces: [
            { key: "1-1", name: "Sub Place 1-1", place: "Place 1" },
            { key: "1-2", name: "Sub Place 1-2", place: "Place 1" },
          ],
        },
        {
          key: "2",
          name: "Place 2",
          subPlaces: [{ key: "2-1", name: "Sub Place 2-1", place: "Place 2" }],
        },
      ];

      // Flatten sub-places data from places data
      const subPlacesData = placesData.flatMap((place) => place.subPlaces);

      // Set state with fetched data
      setPlaces(placesData);
      setSubPlaces(subPlacesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to show modal for adding/editing sub-place
  const showModal = (subPlace = null) => {
    setEditingSubPlace(subPlace);
    if (subPlace) {
      form.setFieldsValue(subPlace);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingSubPlace(null);
    form.resetFields();
  };

  // Function to handle form submission
  const onFinish = (values) => {
    if (editingSubPlace) {
      // Update existing sub-place
      const updatedSubPlaces = subPlaces.map((subPlace) =>
        subPlace.key === editingSubPlace.key
          ? { ...subPlace, ...values }
          : subPlace
      );
      setSubPlaces(updatedSubPlaces);
      message.success("Sub Place updated successfully");
    } else {
      // Add new sub-place
      const newSubPlace = {
        key: Date.now().toString(),
        ...values,
      };
      setSubPlaces([...subPlaces, newSubPlace]);
      message.success("Sub Place added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle sub-place deletion
  const handleDelete = (key) => {
    const updatedSubPlaces = subPlaces.filter(
      (subPlace) => subPlace.key !== key
    );
    setSubPlaces(updatedSubPlaces);
    message.success("Sub Place deleted successfully");
  };

  // Table columns configuration
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
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
        <h1 className="text-2xl font-bold">Sub Places</h1>
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
          Add New Sub Place
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={subPlaces}
        loading={loading}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title={editingSubPlace ? "Edit Sub Place" : "Add New Sub Place"}
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
                message: "Please input the name of the sub place!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="place"
            label="Place"
            rules={[
              { required: true, message: "Please select the parent place!" },
            ]}
          >
            <Select>
              {places.map((place) => (
                <Select.Option key={place.key} value={place.name}>
                  {place.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default SubPlaces;

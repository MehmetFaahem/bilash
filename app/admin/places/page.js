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

const Places = () => {
  // State to store places data
  const [places, setPlaces] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage expanded rows in the table
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store the place being edited
  const [editingPlace, setEditingPlace] = useState(null);
  // Form instance for the modal form
  const [form] = Form.useForm();

  // Fetch places data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data for places
      const placesData = [
        {
          key: "1",
          name: "Place 1",
          subPlaces: [
            { key: "1-1", name: "Sub Place 1-1" },
            { key: "1-2", name: "Sub Place 1-2" },
          ],
        },
        {
          key: "2",
          name: "Place 2",
          subPlaces: [{ key: "2-1", name: "Sub Place 2-1" }],
        },
      ];

      setPlaces(placesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to handle row expansion in the table
  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  // Function to show modal for adding/editing place
  const showModal = (place = null) => {
    setEditingPlace(place);
    if (place) {
      form.setFieldsValue(place);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPlace(null);
    form.resetFields();
  };

  // Function to handle form submission
  const onFinish = (values) => {
    if (editingPlace) {
      // Update existing place
      const updatedPlaces = places.map((place) =>
        place.key === editingPlace.key ? { ...place, ...values } : place
      );
      setPlaces(updatedPlaces);
      message.success("Place updated successfully");
    } else {
      // Add new place
      const newPlace = {
        key: Date.now().toString(),
        ...values,
        subPlaces: [],
      };
      setPlaces([...places, newPlace]);
      message.success("Place added successfully");
    }
    setIsModalVisible(false);
    setEditingPlace(null);
    form.resetFields();
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
            style={{ backgroundColor: "red", color: "white" }} // Theme updated to red
          />
        </Space>
      ),
    },
  ];

  // Define columns for the expanded sub-places table
  const expandedRowRender = (record) => {
    const subColumns = [
      { title: "Sub Place Name", dataIndex: "name", key: "name", width: "50%" },
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
              style={{ backgroundColor: "red", color: "white" }} // Theme updated to red
            />
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={subColumns}
        dataSource={record.subPlaces}
        pagination={false}
      />
    );
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Places</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ backgroundColor: "#001529" }}
        >
          Add New Place
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={places}
        loading={loading}
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: handleExpand,
        }}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingPlace ? "Edit Place" : "Add New Place"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="add_edit_place"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Place Name"
            rules={[
              { required: true, message: "Please input the place name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#001529" }}
            >
              {editingPlace ? "Update Place" : "Add Place"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Places;

"use client";

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
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      // Example static data
      const placesData = [
        {
          key: "1",
          name: "Place 1",
          subPlaces: [
            {
              key: "1-1",
              name: "Sub Place 1-1",
              subOfSubPlaces: [
                { key: "1-1-1", name: "Sub of Sub Place 1-1-1" },
              ],
            },
            {
              key: "1-2",
              name: "Sub Place 1-2",
              subOfSubPlaces: [
                { key: "1-2-1", name: "Sub of Sub Place 1-2-1" },
              ],
            },
          ],
        },
        {
          key: "2",
          name: "Place 2",
          subPlaces: [
            {
              key: "2-1",
              name: "Sub Place 2-1",
              subOfSubPlaces: [
                { key: "2-1-1", name: "Sub of Sub Place 2-1-1" },
              ],
            },
          ],
        },
      ];

      setPlaces(placesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const showModal = (place = null) => {
    setEditingPlace(place);
    if (place) {
      form.setFieldsValue(place);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPlace(null);
    form.resetFields();
  };

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
            style={{ backgroundColor: "#001529", color: "white" }}
          />
        </Space>
      ),
    },
  ];

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
              style={{ backgroundColor: "#001529", color: "white" }}
            />
          </Space>
        ),
      },
    ];

    const subOfSubColumns = [
      {
        title: "Sub of Sub Place Name",
        dataIndex: "name",
        key: "name",
        width: "50%",
      },
      {
        title: () => <div style={{ textAlign: "right" }}>Actions</div>,
        key: "actions",
        width: "50%",
        render: (_, subOfSubRecord) => (
          <Space
            size="middle"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              icon={<EditOutlined />}
              onClick={() => showModal(subOfSubRecord)}
              style={{ backgroundColor: "#001529", color: "white" }}
            />
            <Button
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "#001529", color: "white" }}
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
        expandable={{
          expandedRowRender: (subRecord) => (
            <Table
              columns={subOfSubColumns}
              dataSource={subRecord.subOfSubPlaces}
              pagination={false}
            />
          ),
        }}
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

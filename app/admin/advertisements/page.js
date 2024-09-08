"use client";

// Import necessary libraries and components
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Select,
  InputNumber,
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";
import dummy_ad_image from "@/public/images/ad.jpeg";

const Advertisements = () => {
  // State to store advertisements data
  const [ads, setAds] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store the advertisement being edited
  const [editingAd, setEditingAd] = useState(null);
  // Form instance for the modal form
  const [form] = Form.useForm();

  // Fetch advertisements data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data for advertisements
      const adsData = Array.from({ length: 6 }, (_, index) => ({
        key: (index + 1).toString(),
        image: dummy_ad_image.src,
        duration: Math.floor(Math.random() * 60) + 1, // Random duration between 1 and 60 seconds
        placement: ["Homepage", "Sidebar", "Footer"][index % 3], // Cycle through placements
      }));

      setAds(adsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to show modal for adding/editing advertisement
  const showModal = (ad) => {
    setEditingAd(ad);
    if (ad) {
      form.setFieldsValue({
        ...ad,
        image: [
          {
            uid: "-1",
            name: ad.image,
            status: "done",
            url: ad.image,
          },
        ],
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAd(null);
    form.resetFields();
  };

  // Function to handle form submission
  const onFinish = (values) => {
    if (editingAd) {
      // Update existing advertisement
      const updatedAds = ads.map((ad) =>
        ad.key === editingAd.key
          ? {
              ...ad,
              ...values,
              image: values.image[0]?.originFileObj
                ? URL.createObjectURL(values.image[0].originFileObj)
                : ad.image,
            }
          : ad
      );
      setAds(updatedAds);
      message.success("Advertisement updated successfully");
    } else {
      // Add new advertisement
      const newAd = {
        key: Date.now().toString(),
        ...values,
        image: values.image[0]?.originFileObj
          ? URL.createObjectURL(values.image[0].originFileObj)
          : "",
      };
      setAds([...ads, newAd]);
      message.success("Advertisement added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle advertisement deletion
  const handleDelete = (key) => {
    const updatedAds = ads.filter((ad) => ad.key !== key);
    setAds(updatedAds);
    message.success("Advertisement deleted successfully");
  };

  // Define table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} alt="ad" width={50} />,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Placement",
      dataIndex: "placement",
      key: "placement",
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
            style={{ backgroundColor: "red", color: "white" }} // Updated theme to red
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Advertisements</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{
            backgroundColor: "#001529",
            color: "white",
          }}
        >
          Add New Advertisement
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={ads}
        loading={loading}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title={editingAd ? "Edit Advertisement" : "Add New Advertisement"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="image"
            label="Advertisement Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload name="logo" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration (seconds)"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="placement"
            label="Placement"
            rules={[
              { required: true, message: "Please select the placement!" },
            ]}
          >
            <Select>
              <Select.Option value="Homepage">Homepage</Select.Option>
              <Select.Option value="Sidebar">Sidebar</Select.Option>
              <Select.Option value="Footer">Footer</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Advertisements;

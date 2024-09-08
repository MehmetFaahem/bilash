"use client";

// Import necessary libraries and components
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Image,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Descriptions,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill for rich text editing, disabling server-side rendering
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Products = () => {
  // State to store products data
  const [products, setProducts] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store the product being edited
  const [editingProduct, setEditingProduct] = useState(null);
  // Form instance for the modal form
  const [form] = Form.useForm();
  // State to control view modal visibility
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  // State to store the product being viewed
  const [viewingProduct, setViewingProduct] = useState(null);

  // Fetch products data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data
      const productsData = [
        {
          key: "1",
          image: "https://via.placeholder.com/150",
          name: "Product 1",
          price: 100,
          discountPrice: 80,
          description: "Description of Product 1",
        },
        {
          key: "2",
          image: "https://via.placeholder.com/150",
          name: "Product 2",
          price: 120,
          discountPrice: 95,
          description: "Description of Product 2",
        },
        {
          key: "3",
          image: "https://via.placeholder.com/150",
          name: "Product 3",
          price: 85,
          discountPrice: 70,
          description: "Description of Product 3",
        },
        {
          key: "4",
          image: "https://via.placeholder.com/150",
          name: "Product 4",
          price: 150,
          discountPrice: 130,
          description: "Description of Product 4",
        },
        {
          key: "5",
          image: "https://via.placeholder.com/150",
          name: "Product 5",
          price: 200,
          discountPrice: 180,
          description: "Description of Product 5",
        },
        {
          key: "6",
          image: "https://via.placeholder.com/150",
          name: "Product 6",
          price: 75,
          discountPrice: 60,
          description: "Description of Product 6",
        },
        {
          key: "7",
          image: "https://via.placeholder.com/150",
          name: "Product 7",
          price: 90,
          discountPrice: 75,
          description: "Description of Product 7",
        },
        {
          key: "8",
          image: "https://via.placeholder.com/150",
          name: "Product 8",
          price: 110,
          discountPrice: 95,
          description: "Description of Product 8",
        },
      ];

      // Set products data and update loading status
      setProducts(productsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to show modal for adding/editing product
  const showModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      form.setFieldsValue({
        ...product,
        image: product.image ? [{ url: product.image, uid: "1" }] : [],
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  // Function to handle form submission
  const onFinish = (values) => {
    const imageUrl =
      values.image && values.image.length > 0 ? values.image[0].url : "";
    const updatedValues = { ...values, image: imageUrl };

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.key === editingProduct.key
          ? { ...product, ...updatedValues }
          : product
      );
      setProducts(updatedProducts);
      message.success("Product updated successfully");
    } else {
      // Add new product
      const newProduct = {
        key: Date.now().toString(),
        ...updatedValues,
      };
      setProducts([...products, newProduct]);
      message.success("Product added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle product deletion
  const handleDelete = (key) => {
    const updatedProducts = products.filter((product) => product.key !== key);
    setProducts(updatedProducts);
    message.success("Product deleted successfully");
  };

  // Function to show view modal
  const showViewModal = (product) => {
    setViewingProduct(product);
    setIsViewModalVisible(true);
  };

  // Function to handle view modal cancel action
  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingProduct(null);
  };

  // Define table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image width={50} src={text} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "discountPrice",
      width: 140,
      render: (text, record) => (
        <span
          style={{
            color: record.discountPrice < record.price ? "green" : "inherit",
          }}
        >
          ${text.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div>{text.slice(0, 40).replace(/<[^>]*>/g, "") + "..."}</div>
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
            icon={<EditOutlined />}
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

  // Function to handle adding a new product
  const handleAddProduct = () => {
    showModal();
  };

  // Configuration for ReactQuill toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
          style={{ backgroundColor: "#001529", color: "white" }}
        >
          Add New Product
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        width={800}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="image"
            label="Product Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              name="logo"
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the product!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input the price of the product!",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="discountPrice"
            label="Discount Price"
            rules={[
              {
                required: true,
                message: "Please input the discount price of the product!",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the description of the product!",
              },
            ]}
          >
            <ReactQuill theme="snow" modules={modules} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Product Details"
        visible={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={null}
        width={800}
      >
        {viewingProduct && (
          <Descriptions bordered>
            <Descriptions.Item label="Image" span={3}>
              <Image width={100} src={viewingProduct.image} />
            </Descriptions.Item>
            <Descriptions.Item label="Name" span={3}>
              {viewingProduct.name}
            </Descriptions.Item>
            <Descriptions.Item label="Price" span={3}>
              ${viewingProduct.price.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Discount Price" span={3}>
              ${viewingProduct.discountPrice.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              <div
                dangerouslySetInnerHTML={{ __html: viewingProduct.description }}
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Products;

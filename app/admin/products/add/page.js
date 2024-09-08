"use client";

// Import necessary libraries and components
import { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill for rich text editing, disabling server-side rendering
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [form] = Form.useForm(); // Initialize form
  const [loading, setLoading] = useState(false); // State for loading status
  const router = useRouter(); // Router for navigation

  // Function to handle form submission
  const onFinish = async (values) => {
    setLoading(true); // Set loading to true when form is submitted
    try {
      // Here you would typically send the data to your API
      console.log("Received values of form: ", values);
      message.success("Product added successfully"); // Show success message
      form.resetFields(); // Reset form fields
      router.push("/admin/products"); // Redirect to products page
    } catch (error) {
      message.error("Failed to add product"); // Show error message
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  // Normalize the file upload event
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Configuration for ReactQuill toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Formats supported by ReactQuill
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <Form
        form={form}
        name="add_product"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        {/* Product Name Input */}
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Price Input */}
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Discount Price Input with validation */}
        <Form.Item
          name="discountPrice"
          label="Discount Price"
          rules={[
            { required: true, message: "Please input the discount price!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("price") >= value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Discount price must be less than or equal to the regular price!"
                  )
                );
              },
            }),
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Description Input using ReactQuill */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            style={{ height: "200px" }}
          />
        </Form.Item>

        {/* Product Image Upload */}
        <Form.Item
          name="image"
          label="Product Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload an image!" }]}
          style={{ marginTop: "50px" }}
        >
          <Upload name="logo" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ backgroundColor: "red" }} // Updated button color to red
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  );
};

export default AddProduct;

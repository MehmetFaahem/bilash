"use client";

import { useState, useEffect } from "react";
import { Table, Button, Space, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products data from an API or define them statically
    const fetchData = async () => {
      // Example static data
      const productsData = [
        {
          key: "1",
          image: "https://via.placeholder.com/150",
          name: "Product 1",
          price: "$100",
          discountPrice: "$80",
          description: "Description of Product 1",
        },
        {
          key: "2",
          image: "https://via.placeholder.com/150",
          name: "Product 2",
          price: "$200",
          discountPrice: "$150",
          description: "Description of Product 2",
        },
        {
          key: "3",
          image: "https://via.placeholder.com/150",
          name: "Product 3",
          price: "$300",
          discountPrice: "$250",
          description: "Description of Product 3",
        },
        {
          key: "4",
          image: "https://via.placeholder.com/150",
          name: "Product 4",
          price: "$400",
          discountPrice: "$350",
          description: "Description of Product 4",
        },
        {
          key: "5",
          image: "https://via.placeholder.com/150",
          name: "Product 5",
          price: "$500",
          discountPrice: "$450",
          description: "Description of Product 5",
        },
        {
          key: "6",
          image: "https://via.placeholder.com/150",
          name: "Product 6",
          price: "$600",
          discountPrice: "$550",
          description: "Description of Product 6",
        },
        {
          key: "7",
          image: "https://via.placeholder.com/150",
          name: "Product 7",
          price: "$700",
          discountPrice: "$650",
          description: "Description of Product 7",
        },
        {
          key: "8",
          image: "https://via.placeholder.com/150",
          name: "Product 8",
          price: "$800",
          discountPrice: "$750",
          description: "Description of Product 8",
        },
        {
          key: "9",
          image: "https://via.placeholder.com/150",
          name: "Product 9",
          price: "$900",
          discountPrice: "$850",
          description: "Description of Product 9",
        },
        {
          key: "10",
          image: "https://via.placeholder.com/150",
          name: "Product 10",
          price: "$1000",
          discountPrice: "$950",
          description: "Description of Product 10",
        },
      ];

      setProducts(productsData);
      setLoading(false);
    };

    fetchData();
  }, []);

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
          {text + ".00"}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </AdminLayout>
  );
};

export default Products;

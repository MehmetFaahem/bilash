"use client";

import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, message, Input } from "antd";
import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import AdminLayout from "@/app/components/admin/AdminLayout";

const Sellers = () => {
  // State to store sellers data
  const [sellers, setSellers] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to store selected seller details
  const [selectedSeller, setSelectedSeller] = useState(null);
  // State to manage search text
  const [searchText, setSearchText] = useState("");

  // Fetch sellers data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Example static data
      const sellersData = [
        {
          key: "1",
          name: "Seller 1",
          email: "seller1@example.com",
          phone: "123-456-7890",
          products: [
            { key: "1-1", name: "Product 1-1", price: 100 },
            { key: "1-2", name: "Product 1-2", price: 200 },
          ],
          description: "Description for Seller 1",
        },
        {
          key: "2",
          name: "Seller 2",
          email: "seller2@example.com",
          phone: "098-765-4321",
          products: [
            { key: "2-1", name: "Product 2-1", price: 150 },
            { key: "2-2", name: "Product 2-2", price: 250 },
          ],
          description: "Description for Seller 2",
        },
      ];

      // Set sellers data and update loading state
      setSellers(sellersData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to show modal with seller details
  const showModal = (seller) => {
    setSelectedSeller(seller);
    setIsModalVisible(true);
  };

  // Function to handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSeller(null);
  };

  // Function to handle delete action
  const handleDelete = (key) => {
    const updatedSellers = sellers.filter((seller) => seller.key !== key);
    setSellers(updatedSellers);
    message.success("Seller deleted successfully");
  };

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Filter sellers based on search text
  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products) => products.length,
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
            onClick={() => showModal(record)}
            style={{ backgroundColor: "#001529", color: "white" }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            style={{ backgroundColor: "red", color: "white" }} // Updated button color to red
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sellers</h1>
        <Input
          placeholder="Search sellers"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredSellers}
        loading={loading}
        rowKey="key"
        style={{ marginTop: 16 }}
      />
      <Modal
        title="Seller Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedSeller && (
          <div>
            <p>
              <strong>Name:</strong> {selectedSeller.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedSeller.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedSeller.phone}
            </p>
            <p>
              <strong>Description:</strong> {selectedSeller.description}
            </p>
            <p>
              <strong>Products:</strong>
            </p>
            <Table
              columns={[
                { title: "Product Name", dataIndex: "name", key: "name" },
                { title: "Price", dataIndex: "price", key: "price" },
              ]}
              dataSource={selectedSeller.products}
              pagination={false}
              rowKey="key"
            />
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Sellers;

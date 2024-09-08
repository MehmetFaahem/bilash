"use client";

import { useState, useEffect } from "react";
import { Bar, Line, Doughnut, Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch sellers and customers data from an API or define them statically
    const fetchData = async () => {
      // Example static data
      const sellersData = [10, 20, 30, 40, 50];
      const customersData = [15, 25, 35, 45, 55];

      setSellers(sellersData);
      setCustomers(customersData);
    };

    fetchData();
  }, []);

  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sellers",
        data: sellers,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Customers",
        data: customers,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sellers",
        data: sellers,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Customers",
        data: customers,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Sellers", "Customers"],
    datasets: [
      {
        label: "Distribution",
        data: [
          sellers.reduce((a, b) => a + b, 0),
          customers.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: "Sellers",
        data: sellers.map((value, index) => ({
          x: index,
          y: value,
          r: value / 2,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Customers",
        data: customers.map((value, index) => ({
          x: index,
          y: value,
          r: value / 2,
        })),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sellers and Customers Charts",
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 h-[400px]">
          <Bar data={barData} options={options} />
        </div>
        <div className="p-4 h-[400px]">
          <Line data={lineData} options={options} />
        </div>
        <div className="p-4 h-[400px]">
          <Doughnut data={doughnutData} options={options} />
        </div>
        <div className="p-4 h-[400px]">
          <Bubble data={bubbleData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Charts;

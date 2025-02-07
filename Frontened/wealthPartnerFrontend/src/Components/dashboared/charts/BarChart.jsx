import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "../../../styles/charts.css";
import {
  Chart as ChartJS,
  CategoryScale, // For the "category" scale
  LinearScale, // For the "linear" scale
  BarElement, // For the bars in the bar chart
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import axios from "axios";

const BarChart = ({ accessToken }) => {
  const [chartLabel, setChartLabel] = useState("yearly Expense");
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);

  useEffect(() => {
    if (accessToken) {
      axios
        .post("http://localhost:8080/api/plaid/yearly-transactions", {
          accessToken,
        })
        .then((res) => {
          const formattedData = prepareChartData(res.data.transactions);
          setMonthlyTransactions(formattedData);
          // console.log(res.data.transactions)
        })
        .catch((err) => console.error("Error fetching transactions:", err));
    }
  }, [accessToken]);

  // Function to group transactions by month
  const prepareChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const monthlyData = Array(12).fill(0); // Initialize array for 12 months

    transactions.forEach((txn) => {
      const month = new Date(txn.date).getMonth(); // Get month (0 = Jan, 11 = Dec)
      monthlyData[month] += txn.amount; // Add amount to corresponding month
    });
    // console.log(monthlyData) ;
    return monthlyData;
  };

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ], // Months of the year
    datasets: [
      {
        label: "Expenses",
        data: monthlyTransactions.length
          ? monthlyTransactions
          : [
              1200, 1900, 300, 500, 2000, 2300, 1800, 1500, 2200, 3000, 1800,
              2100,
            ], // Default if no data
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          boxHeight: 10,
          font: {
            size: 14,
            family: "Arial",
            style: "italic",
            weight: "bold",
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: chartLabel,
        color: "#333",
        font: {
          size: 18,
          weight: "bold",
          style: "italic",
        },
      },
    },

    scales: {
      x: {
        grid: {
          color: "white",
        },
        ticks: {
          color: "#000",
          font: {
            style: "italic",
            weight: "bold",
          },
          padding: 10,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          color: "#000",
          font: {
            style: "italic",
            weight: "bold",
          },
          padding: 6,
        },
      },
    },
  };

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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

const BarChart = ({ expensesData }) => {
  const [chartLabel, setChartLabel] = useState("Monthly Expense");
  const [monthlyExpenses, setMonthlyExpenses] = useState({
    expensesChartLabels: [],
    expensesChartData: [],
  });

  useEffect(() => {
    if (expensesData && expensesData.expensesChartLabels && expensesData.expensesChartData) {
      setMonthlyExpenses(expensesData);
    }
  }, [expensesData]);

  const data = {
    labels:
      monthlyExpenses.expensesChartLabels.length > 0
        ? monthlyExpenses.expensesChartLabels
        : ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Expenses",
        data:
          monthlyExpenses.expensesChartData.length > 0
            ? monthlyExpenses.expensesChartData
            : [1200, 1900, 300, 500, 2000, 2300],
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
  const handlechange = (value) => {
    setChartLabel(value);
    // console.log(chartLabel);
  };

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;

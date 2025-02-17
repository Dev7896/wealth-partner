import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import '../../../styles/charts.css' ;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({incomeData , expensesData}) => {
  console.log(incomeData ,expensesData) ;
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Expense Trend",
        data: expensesData?.expensesChartData.length > 0 ?  expensesData?.expensesChartData :  [1500, 2500, 800, 700, 2500, 2800],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Adds curve to the lines
      },
      {
        label: "Income",
        data: incomeData?.incomeChartData.length > 0 ? incomeData?.incomeChartData :  [1200, 1900, 300, 500, 2000, 2300],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
    boderWidth: 0 ,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false ,
    plugins: {
      legend: {
        position: "top",
        labels : {
          boxWidth : 10 ,
          boxHeight : 10 ,
          font  : {
            size : 14  ,
            style : 'italic' ,
            weight  : 'bold'
          } ,
          boderWidth: 2 ,
          usePointStyle : true ,
        }
      },
      title: {
        display: true,
        text: "Expense vs Income",
        color : '#333' ,
        font : {
          style : 'italic' ,
          weight  : 'bold' ,
          size  : 18
        }
      },

      hover: {
        mode: "nearest",
        intersect: true,
      },
    },
    animation: {
      duration: 2000, // Animation duration (2 seconds)
      easing: 'easeOutBounce', // Easing effect for the entire chart animation
    },
    animations: {
      tension: {
        duration: 1500, // Animation for line tension (curvature)
        easing: 'easeOutElastic',
        from: 1,
        to: 0.4, // End value for tension
        loop: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks : {
          color : '#333' ,
          font: {
            // size : 14 ,
            style: "italic",
            weight: "bold",
          },
          padding: 10,
        }
      },
      y: {
        grid: {
          display: true,
        },
        ticks : {
          color : '#333' ,
          font: {
            // size : 14 ,
            style: "italic",
            weight: "bold",
          },
          padding: 10,
        }
      },
    },
  };

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;

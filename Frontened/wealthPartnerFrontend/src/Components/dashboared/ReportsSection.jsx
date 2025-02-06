import React, { useState } from "react";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import { useEffect } from "react";
import StatCard from "./StatCard";
import axios from "axios";
import Cookies from "js-cookie";
import { showMessage } from "../LoginSections/SignupUtility";

const ReportsSection = ({ stocks }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/sales/", {
          email: Cookies.get("email"),
        });
  
        if (response.data) {
          setTotalRevenue(response.data.totalRevenue);
          setTotalSales(response.data.totalSales);
          setTotalStock(response.data.totalStocks);
        }
      } catch (error) {
        showMessage(error.message, "error");
      }
    };
  
    // Calculate total stock
    // if (stocks && Array.isArray(stocks)) {
    //   let stockCount = stocks.reduce((total, stock) => total + stock.quantity, 0);
    //   setTotalStock(stockCount);
    // }
  
    fetchSalesData();
  }, [stocks]); // Dependencies
  
  return (
    <div className="p-4">
      {/* Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard type="stock" value={totalStock} />
        <StatCard type="sales" value={totalSales} />
        <StatCard type="revenue" value={totalRevenue} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Expense vs Income</h3>
          <LineChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Sales Overview</h3>
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;

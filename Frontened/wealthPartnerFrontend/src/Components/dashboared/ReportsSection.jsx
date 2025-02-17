import React, { useState } from "react";
import LineChart from "./charts/LineChart";
import BarChart from "./chartsForReports/barChart";
import { useEffect } from "react";
import StatCard from "./StatCard";
import axios from "axios";
import Cookies from "js-cookie";
import { showMessage } from "../LoginSections/SignupUtility";

const ReportsSection = ({ stocks }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [expensesData, setExpensesData] = useState({
    expensesChartLabels: [],
    expensesChartData: [],
  });
  const [incomeData, setIncomeData] = useState({
    incomeChartLabels: [],
    incomeChartData: [],
  });

  const fetchSalesData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/sales/", {
        email: Cookies.get("email"),
      });

      const salesData = response.data;
      if (!salesData) {
        showMessage("No sales data found", "error");
        return;
      }

      // Initialize empty objects for grouping
      const monthlyExpenses = {};
      const monthlyIncome = {};

      salesData.expensesData?.forEach((expense) => {
        const date = new Date(expense.time);
        const month = date.toLocaleString("default", { month: "long" });

        if (!monthlyExpenses[month]) monthlyExpenses[month] = 0;
        monthlyExpenses[month] += expense.price * expense.quantity;
      });

      salesData.incomeData?.forEach((income) => {
        const date = new Date(income.time);
        const month = date.toLocaleString("default", { month: "long" });

        if (!monthlyIncome[month]) monthlyIncome[month] = 0;
        monthlyIncome[month] += income.price * income.quantity;
      });

      // Convert to chart-friendly format
      setExpensesData({
        expensesChartLabels: Object.keys(monthlyExpenses),
        expensesChartData: Object.values(monthlyExpenses),
      });

      setIncomeData({
        incomeChartLabels: Object.keys(monthlyIncome),
        incomeChartData: Object.values(monthlyIncome),
      });

      setTotalRevenue(salesData.totalRevenue);
      setTotalSales(salesData.totalSales);
      setTotalStock(salesData.totalStocks);
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  // Fetch data on component mount and when `stocks` change
  useEffect(() => {
    fetchSalesData();
  }, [stocks]);

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
          <LineChart incomeData={incomeData} expensesData={expensesData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Sales Overview</h3>
          <BarChart expensesData={expensesData} />
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;

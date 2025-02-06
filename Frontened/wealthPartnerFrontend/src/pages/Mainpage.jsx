import { useState, useRef, useEffect } from "react";
import { Menu, X, Bell, ShoppingCart, LogOut , Banknote } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  BarChart,
  PackagePlus,
  FolderPlus,
  FileText,
  User,
} from "lucide-react";
import ReportsSection from "../Components/dashboared/ReportsSection";
import DashboardStats from "../Components/dashboared/DashboaredStats";
import AddCategory from "../Components/dashboared/AddCategory";
import AddStock from "../Components/dashboared/AddStock";
import Invoice from "./Invoice";
import ManageStocks from "../Components/dashboared/ManageStocks";
import ProfilePage from "../Components/dashboared/Profile";
import UserProfileEdit from "../Components/dashboared/user-profile-edit.tsx";
import Header from "@/Components/dashboared/Header";
import NotificationsPage from "../Components/dashboared/NotificationsPage";
import BankIntegration from "../Components/dashboared/BankIntegration";
import RecentTransactions from "@/Components/dashboared/RecentTransactions";
import Bar from "../Components/dashboared/charts/BarChart";


const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeSession,
  setActiveSession,
}) => {
  const sidebarRef = useRef(null);
  const [showReports, setShowReports] = useState(true);

  const handleLogout = (logout) => {
    Cookies.remove("authToken");
    Cookies.remove("email");

    return <Navigate to="/login" />;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed h-full bg-primary text-white w-64 p-4 transition-transform z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <button className="md:hidden text-white mb-4" onClick={toggleSidebar}>
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-4 link-logo">Wealth Partner</h2>
      <ul className="flex flex-col justify-center font-semibold capitalize h-2/3">
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("reports")}
        >
          <BarChart size={20} /> <a href="#">Reports</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("addStock")}
        >
          <PackagePlus size={20} /> <a href="#">Add stock</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("addCategory")}
        >
          <FolderPlus size={20} /> <a href="#">Add category</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("manageStocks")}
        >
          <ShoppingCart size={20} /> <a href="#">manage stocks</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("invoice")}
        >
          <FileText size={20} /> <a href="#">Invoice</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("profile")}
        >
          <User size={20} /> <a href="#">Profile</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("personal")}
        >
          <Banknote size={20} /> <a href="#">Bank Integration</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2"
          onClick={() => setActiveSession("notifications")}
        >
          <Bell size={20} /> <a href="#">Notifications</a>
        </li>
        <li
          className="p-2 hover:bg-gray-300 rounded flex items-center gap-2 mt-auto"
          onClick={() => handleLogout(true)}
        >
          <LogOut size={20} /> <a href="#">Log out</a>
        </li>
      </ul>
    </div>
  );
};

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [activeSession, setActiveSession] = useState("reports");
  const [stocks, setStocks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Update stocks when new data is available
  const updateReport = (newStocks) => {
    setStocks(newStocks);
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
      />
      <div className="flex-1 p-4 md:ml-64 transition-all">
        <button
          className="md:hidden p-2 bg-gray-900 text-white rounded"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        {/* <h1 className="text-2xl font-bold">Main Dashboard</h1> */}
        <Header />
        {activeSession === "reports" && <ReportsSection stocks={stocks} />}
        {activeSession === "addCategory" && <AddCategory />}
        {activeSession === "addStock" && <AddStock />}
        {activeSession === "invoice" && <Invoice />}
        {activeSession === "manageStocks" && (
          <ManageStocks updateReport={updateReport} />
        )}
        {activeSession === "profile" && <UserProfileEdit />}
        {activeSession === "notifications" && <NotificationsPage />}
        {activeSession === "personal" && (
          <div>
            <BankIntegration
              accessToken={accessToken}
              setAccessToken={setAccessToken}
            />
            {accessToken && (
              <RecentTransactions
                accessToken={accessToken}
                transactions={transactions}
                setTransactions={setTransactions}
              />
            )}
            {transactions && transactions.length > 0 ? (
              <Bar transactions={transactions} />
            ) : (
              <p>No transactions found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

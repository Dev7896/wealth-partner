import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
// import { Provider } from "react-redux";
import "./index.css";

// all imports realated to login and sigup
import {
  Signup,
  Login,
  ForgetPassword,
} from "./Components/LoginSections/LoginSections";
import LandingPage from "./pages/LandingPage";
import Mainpage from "./pages/Mainpage";
import PrivateRoute from "./Components/PrivateRotue";
// import ComingSoonPage from "./Components/coming-soon-page";
import Pricingpage from "./pages/Pricingpage";
import Invoice from "./pages/Invoice";
import InvoicePreview from "./Components/Invoice/InvoicePreview/InvoicePreview";
import MainPage from "./pages/Mainpage";

const invoiceData = {
  companyName: "TechNova Solutions",
  companyAddress: "123 Business Street, City, Country",
  companyEmail: "wealthPartner9@gmail.com",
  companyPhone: "+123 456 7890",
  customerName: "John Doe",
  customerAddress: "456 Customer Lane, Town, State",
  customerEmail: "johndoe@example.com",
  customerPhone: "+987 654 3210",
  invoiceNumber: "INV-202501",
  invoiceDate: "2025-01-15",
  dueDate: "2025-02-15",
  paymentTerms: "Net 30",
  items: [
    { name: "Web Development Service", quantity: 1, unitPrice: 1500 },
    { name: "Hosting Plan (1 Year)", quantity: 1, unitPrice: 200 },
    { name: "SEO Optimization", quantity: 1, unitPrice: 300 },
  ],
  totalAmount: 2000,
  notes: "Payment is due within 30 days. Thank you for your business!",
};

function App() {
  function checkForToken() {
    const token = Cookies.get("authToken");
    if (!token) {
      return false;
    }
    return true;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            checkForToken() ? (
              <PrivateRoute>
                <Mainpage />
              </PrivateRoute>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route
          path="/mainpage"
          element={
            <PrivateRoute>
              <Mainpage />
            </PrivateRoute>
          }
        />
        <Route path="/test" element={<Mainpage />} />
        <Route path="/pricing" element={<Pricingpage />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route
          path="/invoicePreview"
          element={<InvoicePreview invoiceData={invoiceData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

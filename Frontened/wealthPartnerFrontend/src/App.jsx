import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import './index.css' ;

// all imports realated to login and sigup
import {
  Signup,
  Login,
  ForgetPassword,
} from "./Components/LoginSections/LoginSections";
import LandingPage from "./Components/LandingPage/LandingPage";
import Mainpage from "./Components/mainpage";
import PrivateRoute from "./Components/PrivateRotue";
import ComingSoonPage from "./Components/coming-soon-page";

function App() {
  function checkForToken() {
    const token = Cookies.get("authToken");
    if (!token) {
      return false;
    }
    return true;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={(checkForToken())? <ComingSoonPage /> : <Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/mainpage" element={
            <PrivateRoute>
              {/* <Mainpage /> */}
              <ComingSoonPage />
            </PrivateRoute>
          } />
          <Route path="/test" element={<Mainpage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

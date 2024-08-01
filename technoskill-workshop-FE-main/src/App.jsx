import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/components/HomePage.jsx";
import AddEmployeePage from "./components/components/AddEmployeePage.jsx";
import MyInfoPage from "./components/components/MyInfoPage.jsx";
import LoginPage from "./components/components/LoginPage.jsx";
import SignUpPage from "./components/components/SignUpPage.jsx";
import LoginSuccessPage from "./components/components/LoginSuccessPage.jsx";
import Onboarding from "./components/components/Onboarding.jsx";
import ViewEmployee from "./components/components/ViewEmployee.jsx";
import EditInfo from "./components/components/EditInfo.jsx";
import AdditionSuccess from "./components/components/AdditionSuccess.jsx";
import ForgotPassword from "./components/components/ForgotPassword.jsx";
import OTP from "./components/components/OTP.jsx";
import PasswordChange from "./components/components/PassChange.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/onboarding"} />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/add-employee" element={<AddEmployeePage />} />

        <Route path="/my-info" element={<MyInfoPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="/success" element={<LoginSuccessPage />} />

        <Route path="/onboarding" element={<Onboarding/>} />

        <Route path={"/view-employee"} element={<ViewEmployee/>} />

        <Route path={"/edit-info"} element={<EditInfo />} />

        <Route path={"/addition-success"} element={<AdditionSuccess />} />

        <Route path={"/forgot-password"} element={<ForgotPassword />} />

        <Route path={"/otp"} element={<OTP />} />

        <Route path={"/new-password"} element={<PasswordChange />} />

        {/* Input rute lain di sini */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

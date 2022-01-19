import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Listing from "./pages/Listing";
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
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/contact/:landlordId" element={<Contact />} />
        <Route path="/edit-listing/:listingId" element={<EditListing />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
};

export default App;

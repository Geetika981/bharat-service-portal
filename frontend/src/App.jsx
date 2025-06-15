import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        <Route path="/register" element={!user ? <Register /> : <Profile />} />
        <Route path="/login" element={!user ? <Login /> : <Profile />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

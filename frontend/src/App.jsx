import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slice/authSlice";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import ServicesList from "./pages/admin/ServicesList";
import UsersList from "./pages/admin/UsersList";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import AllServices from "./pages/user/AllServices";
import MyBookings from "./pages/user/MyBookings";
import ProviderBookings from "./pages/provider/ProviderBookings";
import { BookService } from "./pages/user/BookService";
import { AllBookings } from "./pages/admin/AllBookings";
import { Home } from "./pages/Home";
import axios from "./utils/axios";
import ProviderSidebarLayout from "./pages/provider/ProviderSidebarLayout";
import { AdminSidebarLayout } from "./pages/admin/AdminSidebarLayout";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/auth/profile");
        dispatch(setUser(res.data));
      } catch (err) {
        // not logged in
      }
    };
    getProfile();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to={`/${user.role}`} /> : <Login />}
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to={`/${user.role}`} /> : <Register />
          }
        />

        {/* admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminSidebarLayout />
            </PrivateRoute>
          }
        >
          <Route path="services" element={<ServicesList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="bookings" element={<AllBookings />} />
        </Route>
        {/* user routes */}
        <Route
          path="/user"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <UserDashboard />
            </PrivateRoute>
          }
        >
          {/* Note: these are now directly /user/services etc */}
          <Route path="services" element={<AllServices />} />
          <Route path="bookings" element={<MyBookings />} />
        </Route>
        <Route
          path="/book/:serviceId"
          element={user ? <BookService /> : <Navigate to="/login" />}
        />

        {/* provider routes */}

        <Route
          path="/provider"
          element={
            <PrivateRoute allowedRoles={["provider"]}>
              <ProviderSidebarLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="bookings" element={<ProviderBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

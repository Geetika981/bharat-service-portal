import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Users,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slice/authSlice";

const navItems = [
  { name: "Manage Services", icon: Settings, path: "/admin/services" },
  { name: "Manage Users", icon: Users, path: "/admin/users" },
  { name: "View Bookings", icon: BookOpen, path: "/admin/bookings" },
];
import axios from "../../utils/axios";

export const AdminSidebarLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const logout = async () => {
    await axios.post("/auth/logout");
    dispatch(clearUser());
    toast.success("user logged out successfully");
  };
  useEffect(() => {
    navigate("/admin/services");
  }, []);
  return (
    <>
      <Navbar />

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-[64px] left-0 w-64 bg-white h-full shadow-lg transition-transform transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                pathname === path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div>
              <p className="font-semibold text-gray-800">Admin</p>
              <button
                onClick={logout}
                className="text-xs text-red-600 hover:underline flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <div className="p-4 lg:hidden flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <button onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

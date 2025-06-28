import { useEffect, useState } from "react";
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, CalendarCheck, LogOut } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { clearUser } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
const navigation = [
  { name: "Browse Services", href: "/user/services", icon: LayoutDashboard },
  { name: "My Bookings", href: "/user/bookings", icon: CalendarCheck },
];

export default function UserDashboard() {
  const dispatch = useDispatch();
const navigate=useNavigate();
  const logout = async () => {
    await axios.post("/auth/logout");
    dispatch(clearUser());
    toast.success("user logged out successfully");
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isActive = (href) => location.pathname.startsWith(href);

  useEffect(()=>{
    navigate('/user/services')
  },[])
  return (
    <>
      <Navbar />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed z-40 top-[64px] inset-y-0 left-0 w-64 bg-white shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col justify-between`}
      >
        {/* Sidebar Content */}
        <div>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-blue-600">Dashboard</h2>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <nav className="p-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom - user info */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-bold">
              G
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Geetika</p>
              <button
                onClick={logout}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 mt-1"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64">
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h1 className="text-xl font-semibold text-gray-800">
            User Dashboard
          </h1>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}

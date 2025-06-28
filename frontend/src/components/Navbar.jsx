import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">
        ProFinder
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">
              Welcome, {user.name}
            </span>
            <LogoutBtn />
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

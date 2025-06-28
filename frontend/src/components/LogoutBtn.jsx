import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { clearUser } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    await axios.post("/auth/logout");
    dispatch(clearUser());
    toast.success("user logged out successfully");
  };

  return (
    <button onClick={logout} className="text-red-500">
      Logout
    </button>
  );
};

export default LogoutBtn;

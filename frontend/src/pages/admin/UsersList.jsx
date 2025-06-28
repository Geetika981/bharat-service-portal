import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Users } from "lucide-react";
import toast from "react-hot-toast";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const regularUsers = users.filter((u) => u.role === "user");
  const providers = users.filter((u) => u.role === "provider");

  const renderTable = (title, data, color = "blue") => (
    <div className="mb-10">
      <h3 className={`text-xl font-semibold mb-4 text-${color}-600`}>{title}</h3>
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className={`bg-${color}-50 text-${color}-700 uppercase text-xs font-semibold`}>
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4 capitalize text-sm font-semibold">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-white ${
                      u.role === "admin"
                        ? "bg-red-500"
                        : u.role === "provider"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center px-6 py-6 text-gray-500">
                  No {title.toLowerCase()} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-10 flex items-center gap-2">
          <Users className="w-6 h-6" />
          All Registered Users
        </h2>

        {renderTable("Providers", providers, "green")}
        {renderTable("Users", regularUsers, "blue")}
      </div>
    </div>
  );
};

export default UsersList;

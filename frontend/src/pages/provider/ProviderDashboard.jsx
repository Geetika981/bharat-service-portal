import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ServiceForm from "../../components/ServiceForm";
import Navbar from "../../components/Navbar";
import { Pencil, Trash2, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchMyServices = async () => {
    try {
      const res = await axios.get("/provider/services");
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`/provider/services/${id}`);
      fetchMyServices();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (form) => {
    try {
      if (editData) {
        await axios.put(`/provider/services/${editData._id}`, form);
        setEditData(null);
      } else {
        await axios.post("/provider/services", form);
      }
      fetchMyServices();
    } catch (err) {
      toast.error("Submit failed");
    }
  };

  useEffect(() => {
    fetchMyServices();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">📋 Manage Your Services</h2>

      <div className="bg-white shadow-md rounded-xl p-6 mb-10 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {editData ? "✏️ Edit Service" : "➕ Add New Service"}
        </h3>
        <ServiceForm onSubmit={handleSubmit} initialData={editData} />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 border-b">Title</th>
              <th className="px-6 py-4 border-b">Pincode</th>
              <th className="px-6 py-4 border-b">Status</th>
              <th className="px-6 py-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b font-medium">{s.title}</td>
                  <td className="px-6 py-4 border-b">{s.pincode}</td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${
                        s.approved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {s.approved ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Approved
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" /> Pending
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-center space-x-3">
                    <button
                      onClick={() => setEditData(s)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:underline text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No services added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderDashboard;

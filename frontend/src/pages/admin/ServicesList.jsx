import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ServiceForm from "../../components/ServiceForm";
import {
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Hammer,
  CalendarDays,
  BadgeIndianRupee,
} from "lucide-react";
import toast from "react-hot-toast";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/admin/services");
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to fetch services.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    await axios.delete(`/admin/services/${id}`);
    fetchServices();
  };

  const handleToggle = async (id) => {
    await axios.put(`/admin/services/${id}/toggle`);
    fetchServices();
  };

  const handleSubmit = async (form) => {
    try {
      if (editData) {
        await axios.put(`/admin/services/${editData._id}`, form);
        setEditData(null);
      } else {
        await axios.post("/admin/services", form);
      }
      fetchServices();
    } catch (err) {
      toast.error("Submit failed");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">
          Admin: Manage All Services
        </h1>

        {/* Service Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-12">
          <ServiceForm onSubmit={handleSubmit} initialData={editData} />
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto rounded-2xl shadow ring-1 ring-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-blue-50 text-blue-700 text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Pincode</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Approved</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-2 font-medium text-blue-900">
                    <Hammer className="w-4 h-4 text-blue-500" />
                    {s.title}
                  </td>
                  <td className="px-4 py-3 max-w-xs whitespace-pre-wrap text-gray-700">
                    {s.description || "-"}
                  </td>
                  <td className="px-4 py-3">{s.pincode}</td>
                  <td className="px-4 py-3">{s.category || "-"}</td>
                  <td className="px-4 py-3 flex items-center gap-1 text-green-600 font-medium">
                    <BadgeIndianRupee className="w-4 h-4" />
                    {s.price ?? "0"}
                  </td>
                  <td className="px-4 py-3">
                    {s.approved ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-600 font-semibold text-sm">
                        <XCircle className="w-4 h-4" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center space-x-3 whitespace-nowrap">
                    <button
                      onClick={() => setEditData(s)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleToggle(s._id)}
                      className={`${
                        s.approved
                          ? "text-red-600 hover:text-red-800"
                          : "text-green-600 hover:text-green-800"
                      }`}
                      title={s.approved ? "Disapprove" : "Approve"}
                    >
                      {s.approved ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-gray-500 px-4 py-6"
                  >
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;

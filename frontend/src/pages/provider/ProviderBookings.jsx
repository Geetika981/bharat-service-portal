import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/provider/bookings");
      // console.log(res.data);
      setBookings(res.data);
    } catch (err) {
      toast.error("❌ Failed to load bookings");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/provider/bookings/${id}`, { status: newStatus });
      toast.success("✅ Booking marked as completed");
      fetchBookings();
    } catch (err) {
      toast.error("❌ Status update failed");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (filter === "pending") return b.status === "pending";
    if (filter === "completed") return b.status === "completed";
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Service Bookings
      </h2>

      <div className="text-gray-700 text-sm mb-4">
        Total: {bookings.length} —{" "}
        <span className="text-yellow-600 font-medium">
          {bookings.filter((b) => b.status === "pending").length} Pending
        </span>{" "}
        |{" "}
        <span className="text-green-600 font-medium">
          {bookings.filter((b) => b.status === "completed").length} Completed
        </span>
      </div>

      <div className="mb-6 flex gap-3">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border">Service</th>
              <th className="px-4 py-3 border">User</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{b?.title}</td>
                  <td className="px-4 py-3 border">{b.user?.name}</td>
                  <td className="px-4 py-3 border">{b.user?.email}</td>
                  <td className="px-4 py-3 border capitalize">
                    <span
                      className={`font-medium ${
                        b.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border text-sm text-gray-600">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {b.status === "pending" ? (
                      <button
                        onClick={() => handleStatusChange(b._id, "completed")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Mark Completed
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                      >
                        Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderBookings;

import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { BookOpenCheck, BadgeIndianRupee } from "lucide-react";
import toast from "react-hot-toast";

export const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 flex items-center gap-2">
          <BookOpenCheck className="w-6 h-6" />
          All Bookings Overview
        </h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">User Email</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Provider Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Paid</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{b.user?.name}</td>
                  <td className="px-6 py-4">{b.user?.email}</td>
                  <td className="px-6 py-4">{b.service?.title}</td>
                  <td className="px-6 py-4 flex items-center gap-1 text-green-700 font-semibold">
                    <BadgeIndianRupee className="w-4 h-4" />
                    {b.service?.price ?? "-"}
                  </td>
                  <td className="px-6 py-4">{b.provider?.name || "-"}</td>
                  <td className="px-6 py-4">{b.provider?.email || "-"}</td>
                  <td className="px-6 py-4 capitalize">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white text-xs ${
                        b.status === "completed"
                          ? "bg-green-600"
                          : b.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {b.paymentIntentId ? (
                      <span className="text-green-600">✅ Yes</span>
                    ) : (
                      <span className="text-red-500">❌ No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-10 text-center text-gray-500">
                    No bookings available.
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

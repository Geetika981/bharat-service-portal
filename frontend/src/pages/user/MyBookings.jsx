import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/user/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const completedBookings = bookings.filter((b) => b.status === "completed");

  const renderTable = (data, title) => (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">{title}</h3>
      <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border">Service</th>
              <th className="px-4 py-3 border">Price</th>
              <th className="px-4 py-3 border">Provider</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Booked At</th>
              <th className="px-4 py-3 border">Payment Status</th>
              <th className="px-4 py-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{b.service?.title}</td>
                  <td className="px-4 py-3 border text-green-700 font-medium">₹{b.service?.price}</td>
                  <td className="px-4 py-3 border">{b.provider?.name}</td>
                  <td className="px-4 py-3 border">{b.provider?.email}</td>
                  <td className="px-4 py-3 border text-sm text-gray-600">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 border">
                    {b.paymentIntentId ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border capitalize">{b.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No {title.toLowerCase()}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>

      {renderTable(pendingBookings, "Pending Bookings")}
      {renderTable(completedBookings, "Completed Bookings")}
    </div>
  );
};

export default MyBookings;

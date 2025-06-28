import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [bookedServiceIds, setBookedServiceIds] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const res = await axios.get("/user/services");
      setServices(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error("Failed to load services");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/user/bookings");
      const ids = res.data.map((b) => b.service._id); // Extract booked service IDs
      setBookedServiceIds(ids);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  const handleBook = (serviceId) => {
    navigate(`/book/${serviceId}`);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setQuery(keyword);
    const filteredData = services.filter((s) => {
      return (
        s.title.toLowerCase().includes(keyword) ||
        s.category.toLowerCase().includes(keyword) ||
        s.pincode.toString().includes(keyword) ||
        s.createdBy.name.toLowerCase().includes(keyword)
      );
    });
    setFiltered(filteredData);
  };

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Services</h2>

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by title, category, pincode or provider"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border">Title</th>
              <th className="px-4 py-3 border">Category</th>
              <th className="px-4 py-3 border">Pincode</th>
              <th className="px-4 py-3 border">Price</th>
              <th className="px-4 py-3 border">Provider</th>
              <th className="px-4 py-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s) => {
                const isBooked = bookedServiceIds.includes(s._id);
                return (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border">{s.title}</td>
                    <td className="px-4 py-3 border">{s.category}</td>
                    <td className="px-4 py-3 border">{s.pincode}</td>
                    <td className="px-4 py-3 border font-medium text-green-700">₹{s.price}</td>
                    <td className="px-4 py-3 border">{s.createdBy.name}</td>
                    <td className="px-4 py-3 border text-center">
                      {isBooked ? (
                        <span className="text-green-600 font-semibold">Booked</span>
                      ) : (
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm transition"
                          onClick={() => handleBook(s._id)}
                        >
                          Book
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No matching services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllServices;

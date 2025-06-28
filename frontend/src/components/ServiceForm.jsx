import { useEffect, useState } from "react";

const ServiceForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    pincode: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      description: "",
      category: "",
      price: "",
      location: "",
      pincode: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {[
        { name: "title", label: "Service Title" },
        { name: "description", label: "Description" },
        { name: "category", label: "Category" },
        { name: "location", label: "Location" },
        { name: "pincode", label: "Pincode" },
        { name: "price", label: "Price (₹)" },
      ].map(({ name, label }) => (
        <div key={name} className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
          <input
            type={name === "price" || name === "pincode" ? "number" : "text"}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            required
          />
        </div>
      ))}

      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
        >
          {initialData ? "Update Service" : "Add Service"}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;

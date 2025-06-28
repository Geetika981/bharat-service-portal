import { Booking } from "../models/booking.models.js";
import { Service } from "../models/service.models.js";
import { User } from "../models/user.models.js";

// Create new service
export const createService = async (req, res) => {
  const { title, description, category, price, location, pincode } = req.body;

  const service = new Service({
    title,
    description,
    category,
    price,
    location,
    pincode,
    approved: true, // directly approved if admin
    createdBy: req.user._id,
  });

  await service.save();
  res.status(201).json(service);
};

// Get all services
export const getAllServices = async (req, res) => {
  const services = await Service.find()
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email");
  res.json(services);
};

// Update service
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, price, location, pincode } = req.body;

  await Service.findByIdAndUpdate(id, {
    title,
    description,
    category,
    price,
    location,
    pincode,
  });
  res.json(updated);
};

// Delete service
export const deleteService = async (req, res) => {
  const { id } = req.params;

  await Service.findByIdAndDelete(id);
  res.json({ message: "Service deleted" });
};

// Toggle service approval
export const toggleApproval = async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);

  if (!service) return res.status(404).json({ message: "Service not found" });

  service.approved = !service.approved;
  await service.save();

  res.json({
    message: `Service ${service.approved ? "approved" : "disapproved"}`,
  });
};

// List all users
export const listUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate({
        path: "service",
        select: "title price",
        model: "Service", 
      })
      .populate("provider", "name email");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error in getAllBookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

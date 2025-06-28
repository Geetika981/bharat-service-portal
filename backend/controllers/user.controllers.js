// GET /api/user/services

import { Booking } from "../models/booking.models.js";
import { Service } from "../models/service.models.js";
export const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "createdBy",
      "name _id"
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching service" });
  }
};

// Return only approved services
export const getApprovedServices = async (req, res) => {
  try {
    const services = await Service.find({ approved: true })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to load services" });
  }
};

// POST /api/user/bookings
// Body: { serviceId }
// Creates a booking for the logged-in user
export const createBooking = async (req, res) => {
  const userId = req.user._id;
  const { serviceId } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service || !service.approved) {
      return res.status(400).json({ message: "Invalid or unapproved service" });
    }

    const booking = await Booking.create({
      user: userId,
      service: service._id,
      provider: service.createdBy,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// GET /api/user/bookings
// List all bookings made by the logged-in user
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("service", "title price")
      .populate("provider", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load bookings" });
  }
};

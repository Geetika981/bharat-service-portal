import { Booking } from "../models/booking.models.js";
import { Service } from "../models/service.models.js";

// Add new service
export const addService = async (req, res) => {
  const { title, description, category, price, location, pincode } = req.body;

  const service = new Service({
    title,
    description,
    category,
    price,
    location,
    pincode,
    createdBy: req.user._id,
    approved: false, // providers can't auto-approve
  });

  await service.save();
  res.status(201).json(service);
};

// Get all services of logged-in provider
export const getMyServices = async (req, res) => {
  const services = await Service.find({ createdBy: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(services);
};

// Update own service
export const updateMyService = async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service || service.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const updatedService = await Service.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedService);
};

// Delete own service
export const deleteMyService = async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service || service.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await Service.findByIdAndDelete(id);
  res.json({ message: "Service deleted" });
};

// GET /api/provider/bookings
export const getMyBookingsAsProvider = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user._id })
      .sort({ createdAt: -1 })
      .populate('service', 'title category')
      .populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

// PUT /api/provider/bookings/:id
export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const booking = await Booking.findById(id);

    if (!booking || booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized or booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Status update failed' });
  }
};

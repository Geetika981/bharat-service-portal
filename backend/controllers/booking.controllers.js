import { Booking } from "../models/booking.models.js";

export const createBooking = async (req, res) => {
  try {
    const { serviceId, providerId, paymentIntentId } = req.body;

    // Step 1: Log incoming values
    console.log("➡️ Received booking data:", {
      serviceId,
      providerId,
      paymentIntentId,
      user: req.user,
    });

    // Step 2: Check for missing fields
    if (!serviceId || !providerId || !paymentIntentId) {
      console.log("❌ Missing fields in booking request");
      return res.status(400).json({ message: "Missing booking data" });
    }

    // Step 3: Create booking
    const newBooking = await Booking.create({
      user: req.user._id,
      provider: providerId,
      service: serviceId,
      paymentIntentId,
      status: "pending",
    });

    console.log("✅ Booking Created:", newBooking);

    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error("❌ Booking creation failed:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

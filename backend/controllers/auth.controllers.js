import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already in use" });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = createToken(user._id, user.role);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
    sameSite: "Lax",
    secure: false, // change to true in prod with https
  });
  res.status(201).json({ _id: user._id, name: user.name, role: user.role });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = createToken(user._id, user.role);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
    sameSite: "Lax",
    secure: false,
  });

  res.status(200).json({ _id: user._id, name: user.name, role: user.role });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

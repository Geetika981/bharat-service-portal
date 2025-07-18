import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';

export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


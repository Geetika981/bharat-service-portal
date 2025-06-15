import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "Not authorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return res.status(401).json({ error: "Not authorized" });
  req.userId = decoded.id;
  req.userRole = decoded.role;
  next();
});


export const isAdmin=asyncHandler(async(req,res,next)=>{
    if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
})
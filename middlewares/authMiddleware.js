const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeSchema");
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Employee.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
const isHr = (req, res, next) => {
  if (req.user && req.user.position === "HR") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden - Only HR can use this." });
  }
};

module.exports = { protect, isHr };

const express = require("express");
const {
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getOneEmployee,
} = require("../controllers/employeeController");
const { protect, isHr } = require("../middlewares/authMiddleware");

const router = express.Router();
router.route("/").post(createEmployee);
router
  .route("/:employeeId")
  .get(protect, isHr, getOneEmployee)
  .put(protect, updateEmployee)
  .delete(protect, isHr, deleteEmployee);

module.exports = router;

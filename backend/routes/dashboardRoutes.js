const express = require('express');
const Employee = require('../models/Employee');
const Feedback = require('../models/Feedback');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Dashboard Route (CEO)
router.get('/dashboard', protect, authorize('CEO'), async (req, res) => {
  const employees = await Employee.find({});
  const feedbacks = await Feedback.find({});
  res.json({ employees, feedbacks });
});

// Department Manager Dashboard
router.get('/dashboard/manager', protect, authorize('Manager'), async (req, res) => {
  const employees = await Employee.find({ department: req.employee.department });
  const feedbacks = await Feedback.find({ employeeId: { $in: employees.map(emp => emp.employeeId) } });
  res.json({ employees, feedbacks });
});

// Employee Dashboard
router.get('/dashboard/employee', protect, authorize('Employee'), async (req, res) => {
  const feedbacks = await Feedback.find({ employeeId: req.employee.employeeId });
  res.json({ feedbacks });
});

module.exports = router;

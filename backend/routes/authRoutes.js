const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });

  if (employee && (await bcrypt.compare(password, employee.password))) {
    res.json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      token: jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      }),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

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

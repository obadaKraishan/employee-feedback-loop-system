const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private (CEO and Manager)
router.get('/', protect, authorize('CEO', 'Manager'), async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
});

// @desc    Get logged-in employee profile
// @route   GET /api/employees/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee._id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employee profile', error: error.message });
  }
});

// @desc    Update logged-in employee profile
// @route   PUT /api/employees/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee._id);

    if (employee) {
      employee.name = req.body.name || employee.name;
      employee.email = req.body.email || employee.email;

      if (req.body.password) {
        employee.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedEmployee = await employee.save();

      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

module.exports = router;

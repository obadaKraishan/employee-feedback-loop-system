const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
});

module.exports = router;

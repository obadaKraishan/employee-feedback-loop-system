const express = require('express');
const Department = require('../models/Department');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const departments = await Department.find({});
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch departments', error: error.message });
  }
});

module.exports = router;

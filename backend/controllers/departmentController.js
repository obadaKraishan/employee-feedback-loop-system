const Department = require('../models/Department');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch departments' });
  }
};

module.exports = {
  getDepartments,
};

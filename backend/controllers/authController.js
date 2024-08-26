const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

// @desc    Login employee
// @route   POST /api/auth/login
// @access  Public
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};

module.exports = { loginEmployee };

const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const protect = async (req, res, next) => {
  let token;

  // Check for token in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.employee = await Employee.findById(decoded.id).select('-password');

      if (!req.employee) {
        return res.status(401).json({ message: 'Not authorized, employee not found' });
      }

      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const protect = async (req, res, next) => {
  let token;

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
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      // Check if the employee is trying to close their own feedback
      if (
        req.employee.role === 'Employee' &&
        req.method === 'PUT' &&
        req.route.path.includes('/status') &&
        req.body.status === 'Closed' &&
        req.feedback.employeeId.toString() === req.employee._id.toString()
      ) {
        return next(); // Allow employee to close their feedback
      }
      return res.status(403).json({ message: 'User role not authorized' });
    }
    next();
  };
};

module.exports = { protect, authorize };

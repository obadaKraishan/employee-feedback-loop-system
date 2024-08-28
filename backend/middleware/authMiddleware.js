// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Log the token
            console.log('Token:', token);

            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Log the decoded token
            console.log('Decoded token:', decoded);

            // Find the employee based on the decoded token's ID, excluding the password field
            req.employee = await Employee.findById(decoded.id).select('-password');

            // Log the found employee
            console.log('Employee:', req.employee);

            if (!req.employee) {
                // If no employee is found, return an unauthorized response
                return res.status(401).json({ message: 'Not authorized, employee not found' });
            }

            // Attach the employee data to req.user for consistent reference
            req.user = req.employee;

            // Call the next middleware in the stack
            next();
        } catch (error) {
            // Log the error in token verification
            console.error('Error in token verification:', error.message);

            // If token verification fails, return an unauthorized response
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // If no token is found, return an unauthorized response
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        // Check if the employee's role is included in the allowed roles
        if (!roles.includes(req.employee.role)) {
            // Additional check if the employee is trying to close their own feedback
            if (
                req.employee.role === 'Employee' &&
                req.method === 'PUT' &&
                req.route.path.includes('/status') &&
                req.body.status === 'Closed' &&
                req.feedback.employeeId.toString() === req.employee._id.toString()
            ) {
                return next(); // Allow the employee to close their feedback
            }
            // If the role is not authorized, return a forbidden response
            return res.status(403).json({ message: 'User role not authorized' });
        }
        // Call the next middleware in the stack
        next();
    };
};

module.exports = { protect, authorize };

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const employees = [...Array(100).keys()].map(i => ({
  employeeId: `EMP${i + 1}`,
  name: `Employee ${i + 1}`,
  department: ['IT', 'HR', 'Finance', 'Marketing', 'Sales'][Math.floor(Math.random() * 5)],
  position: ['Developer', 'Manager', 'Analyst', 'Engineer', 'Consultant'][Math.floor(Math.random() * 5)],
  email: `employee${i + 1}@company.com`,
}));

const importData = async () => {
  try {
    await Employee.deleteMany(); // Clear existing data
    await Employee.insertMany(employees);
    console.log('Demo data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

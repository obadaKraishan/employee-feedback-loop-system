const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const Feedback = require('../models/Feedback');
const Department = require('../models/Department'); // Import Department model
const connectDB = require('../config/db');
const { analyzeSentiment } = require('../services/sentimentAnalysisService');

dotenv.config();
connectDB();

const departments = [
  { name: 'IT' },
  { name: 'HR' },
  { name: 'Finance' },
  { name: 'Sales' },
  { name: 'Marketing' },
];

const employees = [
  {
    employeeId: 'EMP1',
    name: 'John Doe',
    department: 'IT',
    position: 'Developer',
    email: 'john.doe@company.com',
    role: 'Employee',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    employeeId: 'EMP2',
    name: 'Jane Smith',
    department: 'HR',
    position: 'Manager',
    email: 'jane.smith@company.com',
    role: 'Manager',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    employeeId: 'EMP3',
    name: 'Robert Brown',
    department: 'Finance',
    position: 'Manager',
    email: 'robert.brown@company.com',
    role: 'Manager',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    employeeId: 'EMP4',
    name: 'Emma Wilson',
    department: 'Sales',
    position: 'Consultant',
    email: 'emma.wilson@company.com',
    role: 'Employee',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    employeeId: 'EMP5',
    name: 'Oliver Taylor',
    department: 'Marketing',
    position: 'Engineer',
    email: 'oliver.taylor@company.com',
    role: 'Employee',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    employeeId: 'EMP6',
    name: 'Sophia Johnson',
    department: 'IT',
    position: 'Manager',
    email: 'sophia.johnson@company.com',
    role: 'Manager',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    employeeId: 'EMP7',
    name: 'William Davis',
    department: 'All',
    position: 'CEO',
    email: 'william.davis@company.com',
    role: 'CEO',
    password: bcrypt.hashSync('password123', 10),
  }
];

const feedbacks = [
  {
    employeeId: 'EMP1',
    message: 'The new project management tool has really improved our workflow. However, it could use more integration with our current IT systems.',
    isAnonymous: false,
  },
  {
    employeeId: 'EMP2',
    message: 'I think the onboarding process could be improved. It would be helpful to have a more detailed guide for new hires.',
    isAnonymous: true,
  },
  {
    employeeId: 'EMP10',
    message: 'The recent update to the finance software has caused some issues with budget reports. A rollback might be necessary.',
    isAnonymous: false,
  },
  {
    employeeId: 'EMP25',
    message: 'The HR department has been doing a great job with the new employee wellness programs.',
    isAnonymous: true,
  },
  {
    employeeId: 'EMP40',
    message: 'We need more resources in the IT department to manage the increasing workload.',
    isAnonymous: false,
  },
  {
    employeeId: 'EMP50',
    message: 'The marketing team’s recent campaign was very successful, but we should consider more digital channels for future campaigns.',
    isAnonymous: false,
  },
  {
    employeeId: 'EMP65',
    message: 'Sales targets have been very high lately. It’s putting a lot of pressure on the team.',
    isAnonymous: true,
  },
  {
    employeeId: 'EMP80',
    message: 'The office environment is great, but it would be nice to have more flexible work hours.',
    isAnonymous: false,
  },
  {
    employeeId: 'EMP95',
    message: 'The company’s focus on innovation is commendable, but we need better tools to collaborate on new ideas.',
    isAnonymous: true,
  },
  {
    employeeId: 'EMP100',
    message: 'I appreciate the transparency in communication from management during the last quarter.',
    isAnonymous: false,
  }
];

const importData = async () => {
  try {
    await Department.deleteMany();
    await Employee.deleteMany();
    await Feedback.deleteMany();
    console.log('Existing data removed');

    await Department.insertMany(departments);
    console.log('Departments seeded');

    await Employee.insertMany(employees);
    console.log('Employees seeded');

    for (const fb of feedbacks) {
      fb.sentimentScore = analyzeSentiment(fb.message);
      await Feedback.create(fb);
    }
    console.log('Feedbacks seeded');

    console.log('Demo data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

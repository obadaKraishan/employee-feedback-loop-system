const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));  // Add this line

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

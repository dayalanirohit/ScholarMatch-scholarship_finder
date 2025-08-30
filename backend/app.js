const express = require('express');
const mongoose = require('mongoose');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const authRoutes = require('./routes/auth'); // Added
const studentsRoutes = require('./routes/studentsRoutes'); // Added (if you need this)
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/students', studentsRoutes); 
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});

module.exports = app;

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Root & Health Check Routes
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'MongoDB Atlas (Connected)' : 'In-Memory Fallback Engine (Active)';
  res.json({
    name: 'IMovies Movie Ticket Booking API',
    status: 'ONLINE',
    database: dbStatus,
    endpoints: {
      auth: '/api/auth',
      movies: '/api/movies',
      shows: '/api/shows',
      bookings: '/api/bookings',
      health: '/api/health',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    databaseConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🎬 IMovies Backend Server running on Port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});

// Attempt MongoDB Atlas Connection
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log('✅ Successfully connected to MongoDB Atlas!');
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB Atlas Connection Notice:');
      console.warn(`   ${err.message}`);
      console.warn('💡 If using MongoDB Atlas, make sure 0.0.0.0/0 is added to IP Whitelist.');
      console.warn('🚀 Live In-Memory Fallback Engine is ACTIVE. Full app functionality is available!');
    });
}

module.exports = app;

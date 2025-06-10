const express = require('express');
const helmet = require('helmet');
const paymentRoutes = require('./routes/payment.routes');
const logger = require('./utils/logger.util');
const authRoutes = require("./routes/auth.routes")

const app = express();

app.use(helmet()); // Secure HTTP headers
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes); // Add auth routes
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
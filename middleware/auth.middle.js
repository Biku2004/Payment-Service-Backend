const jwt = require('jsonwebtoken');
const logger = require('../utils/logger.util');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    logger.warn('Authentication failed: No token provided');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    logger.error('Authentication failed: Invalid token', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = { authenticate };
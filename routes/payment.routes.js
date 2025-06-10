const express = require('express');
const router = express.Router();
const Card = require('../models/Card.model');
const { encrypt } = require('../utils/encryption.util');
const { validateCard } = require('../middleware/validate.middle');
const { authenticate } = require('../middleware/auth.middle'); // Add auth middleware
const logger = require('../utils/logger.util');

router.post('/', authenticate, validateCard, async (req, res) => {
  try {
    const { cardNumber, expiryDate, cvv } = req.body;

    // Encrypt sensitive data
    const encryptedCardNumber = encrypt(cardNumber);
    const encryptedExpiryDate = encrypt(expiryDate);
    const encryptedCVV = encrypt(cvv);

    // Store encrypted data with user reference
    const card = new Card({
      encryptedCardNumber: encryptedCardNumber.encryptedData,
      encryptedExpiryDate: encryptedExpiryDate.encryptedData,
      encryptedCVV: encryptedCVV.encryptedData,
      userId: req.user.userId, // Associate card with authenticated user
    });

    await card.save();
    logger.info(`Card details stored for user ${req.user.username}`);
    res.status(201).json({ message: 'Card details stored successfully' });
  } catch (error) {
    logger.error('Error storing card details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
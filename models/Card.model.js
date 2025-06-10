const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  encryptedCardNumber: { type: String, required: true },
  ivCardNumber: { type: String, required: true },
  encryptedExpiryDate: { type: String, required: true },
  ivExpiryDate: { type: String, required: true },
  encryptedCVV: { type: String, required: true },
  ivCVV: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Card', cardSchema);
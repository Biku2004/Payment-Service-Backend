const Joi = require('joi');

const validateCard = (req, res, next) => {
  const schema = Joi.object({
    cardNumber: Joi.string()
      .creditCard()
      .required()
      .messages({ 'string.creditCard': 'Invalid card number' }),
    expiryDate: Joi.string()
      .pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)
      .required()
      .messages({ 'string.pattern.base': 'Invalid expiry date (MM/YY)' }),
    cvv: Joi.string()
      .pattern(/^[0-9]{3,4}$/)
      .required()
      .messages({ 'string.pattern.base': 'Invalid CVV' }),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { validateCard };
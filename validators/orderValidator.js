const Joi = require("joi");

const orderItemSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Burger ID is required",
    "any.required": "Burger ID is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Burger title is required",
    "any.required": "Burger title is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be positive",
    "any.required": "Price is required",
  }),
});

const orderSchema = Joi.object({
  order: Joi.array().items(orderItemSchema).min(1).required().messages({
    "array.min": "Order must contain at least one item",
    "any.required": "Order is required",
  }),
  name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name must not exceed 100 characters",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be a valid format",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid format",
  }),
  notes: Joi.string().max(500).optional().messages({
    "string.max": "Notes cannot exceed 500 characters",
  }),
});

const validateOrder = (req, res, next) => {
  const { error, value } = orderSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: "Validation failed",
      details: errorMessages,
    });
  }

  req.body = value; // Use validated and sanitized data
  next();
};

module.exports = {
  validateOrder,
  orderSchema,
};

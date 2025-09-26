const Order = require("../models/Order");
const Burger = require("../models/Burger");
const logger = require("../utils/logger");
const { AppError } = require("../middleware/errorHandler");

// Create new order
const createOrder = async (req, res, next) => {
  try {
    const { order, name, phone, email, notes } = req.body;

    // Validate that all burgers exist and are available
    const burgerIds = order.map((item) => item.id);
    const burgers = await Burger.find({
      _id: { $in: burgerIds },
      isAvailable: true,
    });

    if (burgers.length !== burgerIds.length) {
      return next(new AppError("One or more burgers are not available", 400));
    }

    // Create order items with proper structure
    const orderItems = order.map((item) => {
      const burger = burgers.find((b) => b._id.toString() === item.id);
      return {
        burgerId: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const orderData = {
      customer: {
        name,
        phone,
        email,
      },
      items: orderItems,
      notes,
    };

    const newOrder = await Order.create(orderData);

    logger.info(`Created new order: ${newOrder.orderNumber}`);
    res.status(201).json({
      message: "Order created successfully",
      orderId: newOrder.orderNumber,
      order: newOrder,
    });
  } catch (error) {
    logger.error("Error creating order:", error);
    next(error);
  }
};

// Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const { status, limit = 10, page = 1 } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate("items.burgerId", "title image")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(skip);

    const total = await Order.countDocuments(query);

    logger.info(`Retrieved ${orders.length} orders`);
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    logger.error("Error getting orders:", error);
    next(error);
  }
};

// Get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.burgerId",
      "title image"
    );

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    logger.info(`Retrieved order: ${order.orderNumber}`);
    res.json(order);
  } catch (error) {
    logger.error("Error getting order by ID:", error);
    next(error);
  }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    logger.info(`Updated order status: ${order.orderNumber} -> ${status}`);
    res.json(order);
  } catch (error) {
    logger.error("Error updating order status:", error);
    next(error);
  }
};

// Get order by order number
const getOrderByNumber = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    }).populate("items.burgerId", "title image");

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    logger.info(`Retrieved order by number: ${order.orderNumber}`);
    res.json(order);
  } catch (error) {
    logger.error("Error getting order by number:", error);
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrderByNumber,
};

const Burger = require("../models/Burger");
const logger = require("../utils/logger");
const { AppError } = require("../middleware/errorHandler");

// Get all burgers
const getAllBurgers = async (req, res, next) => {
  try {
    const { category, available } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (available !== undefined) {
      query.isAvailable = available === "true";
    }

    const burgers = await Burger.find(query).sort({ createdAt: -1 });

    logger.info(`Retrieved ${burgers.length} burgers`);
    res.json(burgers);
  } catch (error) {
    logger.error("Error getting burgers:", error);
    next(error);
  }
};

// Get burger by ID
const getBurgerById = async (req, res, next) => {
  try {
    const burger = await Burger.findById(req.params.id);

    if (!burger) {
      return next(new AppError("Burger not found", 404));
    }

    logger.info(`Retrieved burger: ${burger.title}`);
    res.json(burger);
  } catch (error) {
    logger.error("Error getting burger by ID:", error);
    next(error);
  }
};

// Create new burger
const createBurger = async (req, res, next) => {
  try {
    const burger = await Burger.create(req.body);

    logger.info(`Created new burger: ${burger.title}`);
    res.status(201).json(burger);
  } catch (error) {
    logger.error("Error creating burger:", error);
    next(error);
  }
};

// Update burger
const updateBurger = async (req, res, next) => {
  try {
    const burger = await Burger.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!burger) {
      return next(new AppError("Burger not found", 404));
    }

    logger.info(`Updated burger: ${burger.title}`);
    res.json(burger);
  } catch (error) {
    logger.error("Error updating burger:", error);
    next(error);
  }
};

// Delete burger
const deleteBurger = async (req, res, next) => {
  try {
    const burger = await Burger.findByIdAndDelete(req.params.id);

    if (!burger) {
      return next(new AppError("Burger not found", 404));
    }

    logger.info(`Deleted burger: ${burger.title}`);
    res.status(204).json();
  } catch (error) {
    logger.error("Error deleting burger:", error);
    next(error);
  }
};

module.exports = {
  getAllBurgers,
  getBurgerById,
  createBurger,
  updateBurger,
  deleteBurger,
};

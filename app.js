const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

// Import custom modules
const config = require("./config/config");
const logger = require("./utils/logger");
const connectDB = require("./config/database");
const { errorHandler, notFound } = require("./middleware/errorHandler");

// Import routes
const burgerRoutes = require("./routes/burgerRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.api.rateLimit.windowMs,
  max: config.api.rateLimit.max,
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use(limiter);

// CORS
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Burgers API Documentation",
  })
);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: config.nodeEnv === "development",
  })
);

// API Routes
app.use("/api/burgers", burgerRoutes);
app.use("/api/orders", orderRoutes);

// Legacy endpoints for backward compatibility
/**
 * @swagger
 * /burgers:
 *   get:
 *     summary: Get all burgers (Legacy)
 *     description: Retrieve a list of all available burgers (Legacy endpoint)
 *     tags: [Legacy]
 *     responses:
 *       200:
 *         description: A list of burgers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Burger'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/burgers", (req, res) => {
  const burgersData = require("./data");
  res.json(burgersData);
});
/**
 * @swagger
 * /burgers-order:
 *   post:
 *     summary: Place a burger order (Legacy)
 *     description: Submit a new burger order with customer details (Legacy endpoint)
 *     tags: [Legacy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *           example:
 *             order:
 *               - id: "1"
 *                 quantity: 2
 *                 title: "Cheddar & Bacon Burger"
 *                 price: 8
 *             name: "John Doe"
 *             phone: "+1234567890"
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/burgers-order", (req, res) => {
  const { order, name, phone } = req.body;

  // Basic validation
  if (!order || !Array.isArray(order) || order.length === 0) {
    return res.status(400).json({ error: "Order must be a non-empty array" });
  }

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  try {
    // Generate a simple order ID (in a real app, this would be stored in a database)
    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    res.json({
      message: "Order received successfully!",
      orderId: orderId,
    });
  } catch (error) {
    logger.error("Error processing order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the order." });
  }
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// Handle 404 routes
app.use(notFound);

// Global error handling middleware
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`🍔 Burgers API Server is running on port ${PORT}`);
  logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  logger.info(`🔍 GraphQL Playground: http://localhost:${PORT}/graphql`);
  logger.info(`❤️  Health Check: http://localhost:${PORT}/health`);
  logger.info(`🌍 Environment: ${config.nodeEnv}`);
});

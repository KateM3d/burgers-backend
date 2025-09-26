require("dotenv").config();

const config = {
  // Server Configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/burgers_db",
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },

  // API Configuration
  api: {
    rateLimit: {
      windowMs:
        parseInt(process.env.API_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.API_RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    },
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || "info",
  },
};

// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0 && config.nodeEnv === "production") {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

module.exports = config;

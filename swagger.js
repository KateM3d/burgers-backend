const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Burgers API",
      version: "1.0.0",
      description: "A comprehensive API for managing burgers and orders",
      contact: {
        name: "API Support",
        email: "support@burgers.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Burger: {
          type: "object",
          required: ["title", "price", "gramms", "basePrice"],
          properties: {
            image: {
              type: "string",
              format: "uri",
              description: "URL of the burger image",
            },
            title: {
              type: "string",
              description: "Name of the burger",
            },
            text: {
              type: "string",
              description: "Description of the burger ingredients",
            },
            price: {
              type: "integer",
              description: "Current price of the burger",
            },
            gramms: {
              type: "integer",
              description: "Weight of the burger in grams",
            },
            basePrice: {
              type: "integer",
              description: "Base price of the burger",
            },
          },
        },
        Order: {
          type: "object",
          required: ["order", "name", "phone"],
          properties: {
            order: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "Burger ID",
                  },
                  quantity: {
                    type: "integer",
                    minimum: 1,
                    description: "Quantity of the burger",
                  },
                  title: {
                    type: "string",
                    description: "Burger title",
                  },
                  price: {
                    type: "number",
                    description: "Price per unit",
                  },
                },
              },
              description: "Array of ordered items",
            },
            name: {
              type: "string",
              description: "Customer name",
            },
            phone: {
              type: "string",
              description: "Customer phone number",
            },
          },
        },
        OrderResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Success message",
            },
            orderId: {
              type: "string",
              description: "Unique order identifier",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
  },
  apis: ["./app.js"], // Path to the API files
};

const specs = swaggerJSDoc(options);

module.exports = specs;

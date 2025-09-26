// MongoDB initialization script
db = db.getSiblingDB("burgers_db");

// Create a user for the application
db.createUser({
  user: "burgers_user",
  pwd: "burgers_password",
  roles: [
    {
      role: "readWrite",
      db: "burgers_db",
    },
  ],
});

// Create collections
db.createCollection("burgers");
db.createCollection("orders");

// Create indexes for better performance
db.burgers.createIndex({ title: 1 });
db.burgers.createIndex({ category: 1 });
db.burgers.createIndex({ isAvailable: 1 });

db.orders.createIndex({ orderNumber: 1 });
db.orders.createIndex({ "customer.phone": 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ createdAt: -1 });

print("Database initialized successfully");

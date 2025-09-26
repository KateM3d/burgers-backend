const request = require("supertest");
const app = require("../app");
const Burger = require("../models/Burger");
const mongoose = require("mongoose");

describe("Burger API", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/burgers_test"
    );
  });

  afterAll(async () => {
    // Close database connection
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear burgers collection before each test
    await Burger.deleteMany({});
  });

  describe("GET /api/burgers", () => {
    it("should return empty array when no burgers exist", async () => {
      const res = await request(app).get("/api/burgers").expect(200);

      expect(res.body).toEqual([]);
    });

    it("should return all burgers", async () => {
      // Create test burgers
      const burger1 = await Burger.create({
        title: "Test Burger 1",
        text: "Test description",
        price: 10,
        gramms: 300,
        basePrice: 10,
        image: "https://example.com/image1.jpg",
        category: "beef",
      });

      const burger2 = await Burger.create({
        title: "Test Burger 2",
        text: "Test description 2",
        price: 12,
        gramms: 350,
        basePrice: 12,
        image: "https://example.com/image2.jpg",
        category: "chicken",
      });

      const res = await request(app).get("/api/burgers").expect(200);

      expect(res.body).toHaveLength(2);
      expect(res.body[0].title).toBe("Test Burger 1");
      expect(res.body[1].title).toBe("Test Burger 2");
    });

    it("should filter burgers by category", async () => {
      // Create test burgers
      await Burger.create({
        title: "Beef Burger",
        text: "Beef description",
        price: 10,
        gramms: 300,
        basePrice: 10,
        image: "https://example.com/beef.jpg",
        category: "beef",
      });

      await Burger.create({
        title: "Chicken Burger",
        text: "Chicken description",
        price: 12,
        gramms: 350,
        basePrice: 12,
        image: "https://example.com/chicken.jpg",
        category: "chicken",
      });

      const res = await request(app)
        .get("/api/burgers?category=beef")
        .expect(200);

      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Beef Burger");
    });
  });

  describe("GET /api/burgers/:id", () => {
    it("should return a specific burger", async () => {
      const burger = await Burger.create({
        title: "Test Burger",
        text: "Test description",
        price: 10,
        gramms: 300,
        basePrice: 10,
        image: "https://example.com/image.jpg",
        category: "beef",
      });

      const res = await request(app)
        .get(`/api/burgers/${burger._id}`)
        .expect(200);

      expect(res.body.title).toBe("Test Burger");
    });

    it("should return 404 for non-existent burger", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/burgers/${fakeId}`).expect(404);

      expect(res.body.status).toBe("fail");
    });
  });

  describe("POST /api/burgers", () => {
    it("should create a new burger", async () => {
      const burgerData = {
        title: "New Burger",
        text: "New burger description",
        price: 15,
        gramms: 400,
        basePrice: 15,
        image: "https://example.com/new-burger.jpg",
        category: "beef",
      };

      const res = await request(app)
        .post("/api/burgers")
        .send(burgerData)
        .expect(201);

      expect(res.body.title).toBe("New Burger");
      expect(res.body.price).toBe(15);
    });

    it("should return 400 for invalid burger data", async () => {
      const invalidData = {
        title: "", // Invalid: empty title
        price: -5, // Invalid: negative price
        gramms: 0, // Invalid: zero grams
      };

      const res = await request(app)
        .post("/api/burgers")
        .send(invalidData)
        .expect(400);

      expect(res.body.status).toBe("fail");
    });
  });
});

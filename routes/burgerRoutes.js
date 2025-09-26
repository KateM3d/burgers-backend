const express = require("express");
const {
  getAllBurgers,
  getBurgerById,
  createBurger,
  updateBurger,
  deleteBurger,
} = require("../controllers/burgerController");

const router = express.Router();

/**
 * @swagger
 * /api/burgers:
 *   get:
 *     summary: Get all burgers
 *     description: Retrieve a list of all available burgers with optional filtering
 *     tags: [Burgers]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [beef, chicken, veggie, special]
 *         description: Filter burgers by category
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *     responses:
 *       200:
 *         description: A list of burgers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Burger'
 */
router.get("/", getAllBurgers);

/**
 * @swagger
 * /api/burgers/{id}:
 *   get:
 *     summary: Get burger by ID
 *     description: Retrieve a specific burger by its ID
 *     tags: [Burgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Burger ID
 *     responses:
 *       200:
 *         description: Burger details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Burger'
 *       404:
 *         description: Burger not found
 */
router.get("/:id", getBurgerById);

/**
 * @swagger
 * /api/burgers:
 *   post:
 *     summary: Create new burger
 *     description: Add a new burger to the menu
 *     tags: [Burgers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Burger'
 *     responses:
 *       201:
 *         description: Burger created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Burger'
 *       400:
 *         description: Invalid input data
 */
router.post("/", createBurger);

/**
 * @swagger
 * /api/burgers/{id}:
 *   put:
 *     summary: Update burger
 *     description: Update an existing burger
 *     tags: [Burgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Burger ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Burger'
 *     responses:
 *       200:
 *         description: Burger updated successfully
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Burger'
 *       404:
 *         description: Burger not found
 */
router.put("/:id", updateBurger);

/**
 * @swagger
 * /api/burgers/{id}:
 *   delete:
 *     summary: Delete burger
 *     description: Remove a burger from the menu
 *     tags: [Burgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Burger ID
 *     responses:
 *       204:
 *         description: Burger deleted successfully
 *       404:
 *         description: Burger not found
 */
router.delete("/:id", deleteBurger);

module.exports = router;

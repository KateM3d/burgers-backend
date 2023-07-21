const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
const burgersData = require("./data");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.get("/burgers", (req, res) => {
  res.json(burgersData);
});
app.post("/burgers-order", (req, res) => {
  const { order, name, phone } = req.body;

  try {
    res.json({ message: "Order received successfully!" });
  } catch (error) {
    console.error("Error processing order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the order." });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

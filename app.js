const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
const burgersData = require("./data");

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/burgers", (req, res) => {
  res.json(burgersData);
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

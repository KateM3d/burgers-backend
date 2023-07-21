const express = require("express");

const app = express();
const PORT = 3000 || process.env.port;
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

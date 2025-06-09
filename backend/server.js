const express = require("express");
const mongoose = require("mongoose");
require("./db/connect");
const cors = require("cors");
const leaves = require("./routes/leaves");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const PORT = 5000;
//middleware
app.use(express.static("../frontend/public"));
app.use(cors());
app.use(express.json());

app.use('/api/v1/leaves', leaves);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};
start();
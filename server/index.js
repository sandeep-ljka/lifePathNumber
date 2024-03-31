require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const defaultRoutes = require("./routes/defaultRoute");
const app = express();
const { PORT, DATABASE_USER, DATABASE_PASSWORD } = process.env;

app.use(cors());
app.use(express.json());
app.use(defaultRoutes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

mongoose
  .connect(
    `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.y8bcjkk.mongodb.net/lifePathNumbersDatabase?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Database connected!!!"))
  .catch((error) => console.error("Error encountered", error));

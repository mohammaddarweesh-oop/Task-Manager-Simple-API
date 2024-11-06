const express = require("express");

const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
require("./db");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Running Server...");
  console.log(`http://localhost:5000`);
});

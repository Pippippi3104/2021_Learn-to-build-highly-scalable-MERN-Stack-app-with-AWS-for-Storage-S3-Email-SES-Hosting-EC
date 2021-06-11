const express = require("express");
const app = express();

// import routes
const authRoutes = require("./routes/auth");

// middlewares
app.use("/api", authRoutes);

// start
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();

const logRoutes = require("./routes/logRoutes");

const middleware = require("./middleware");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.use("/api/logs", logRoutes);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log("Listening on port: ", port);
});

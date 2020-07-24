const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config({ path: "./config/config.env" });

const tasks = require("./routes/tasks");
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/tasks", tasks);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${port}`.cyan
      .underline
  )
);

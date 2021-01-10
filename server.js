const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/error");
dotenv.config({ path: "./config/config.env" });

const articles = require("./routes/articles");
const comments = require("./routes/comments");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

// connect to mongoDb
connectDB();

app.use(express.json());

//logging middleware in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.use(logger);

app.use("/api/v1/articles", articles);
app.use("/api/v1/comments", comments);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => res.send('Hello World!'))
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow
      .bold
  )
);

//handle unhandle promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(err.message.red.underline);

  // close server and exit process with failure
  server.close(() => process.exit(1));
});

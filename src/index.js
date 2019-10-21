
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "morgan";
import expressValidator from "express-validator";
import mongoose from "mongoose";
import log from "./utils/logger";
import routes from "./routes/routes";
dotenv.config();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json"
  );
  next();
});
app.use(helmet());
app.use(expressValidator());
app.use(logger("dev"));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// base api

app.use("/api", routes);

// get the host and port name
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 4000;

const connectionUrl =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URL_PROD
    : process.env.MONGODB_URL_DEV;
mongoose.connect(
connectionUrl,  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => {
    log.info("Connected to database successfully");
  }
);

// CATCH ALL INVALID ROUTES
app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route"
  });
  next();
});

process.on("uncaughtException", () => {
  log.info("WE GOT AN UNCAUGHT EXCEPTION");
  process.exit(0);
});

process.on("unhandledRejection", () => {
  log.info("WE GOT AN UNHANDLED REJECTION");
  process.exit(0);
});

// Listen to port

app.listen(port, () => {
  log.info(`App is listening on ${hostname}: ${port}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close(); // close DB
  log.info("Shutting down server");
  log.info("Server successfully shut down");
  process.exit(0);
});
export default app;

import cors from "cors";
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";

const { json } = bodyParser;
const { success, error } = consola;

// Import Application Constants
import { DB, PORT } from "./constants/index.js";

// Router imports
import userApis from "./routes/user-routes.js";
import orderApis from "./routes/order-routes.js";
import questionApis from "./routes/question-routes.js";
import blogApis from "./routes/blogs-routes.js";
import quoteApis from "./routes/getAQoute-routes.js";

// Import passport middleware
import("./middlewares/passport-middleware.js");

// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
// app.use("/uploads", express.static(join(__dirname, "./uploads")));

// Inject Sub router and apis
app.use("/users/api", userApis);
app.use("/orders/api", orderApis);
app.use("/questions/api", questionApis);
app.use("/blogs/api", blogApis);
app.use("/getaquote/api", quoteApis);

const main = async () => {
  try {
    // Connect with the database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });

    // Start application listening for request on server
    app.listen(PORT || 5001, () => {
      success({
        message: `Server started on Port ${PORT}`,
        badge: true,
      });
    });
  } catch (err) {
    error({
      message: `Unable to connect with server ${err.message}`,
      badge: true,
    });
    main();
  }
};

main();

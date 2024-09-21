const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ROUTER
const quizRouter = require("./src/routes/quizRoutes");
const questionRouter = require("./src/routes/questionRoutes");

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// ROUTES
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/question", questionRouter);

module.exports = app;

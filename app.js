const express = require("express");
const morgan = require("morgan");

const quizRouter = require("./src/routes/quizRoutes");
const questionRouter = require("./src/routes/questionRoutes");

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

// 3) ROUTES
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/question", questionRouter);

module.exports = app;

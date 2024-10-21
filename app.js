const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ROUTER
const studentRouter = require("./src/routes/studentRoutes");

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
app.use("/info", (_, res, next) => {
    res.status(200).json({
        data: {
            fullName: "Nguyen Van A",
            studentCode: "QNUO1234",
        },
    });
    next();
});
app.use("/students", studentRouter);

module.exports = app;

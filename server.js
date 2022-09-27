console.clear();
// libraries
const express = require("express");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// middleware
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", express.static(path.join(__dirname, "frontend")));

const { checkTokenValidity } = require("./utils/checkToken");

// routes
const authRouter = require("./routes/authRoutes");
const accountsRouter = require("./routes/accountsRoutes");
const tasksRouter = require("./routes/tasksRoutes");

app.use("/auth", authRouter);
app.use("/accounts", checkTokenValidity, accountsRouter);
app.use("/tasks", checkTokenValidity, tasksRouter);
// error handling
app.use((err, _, res, __) => {
	res.status(500).json(`Default error handling middleware: ${err}`);
});
app.listen(3000, () => {
	console.log("--- server is connected ---");
});

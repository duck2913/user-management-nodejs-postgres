console.clear();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", express.static(path.join(__dirname, "frontend")));

// routes
const authRouter = require("./routes/authRoutes");
const accountsRouter = require("./routes/accountsRoutes");

app.use("/auth", authRouter);
app.use("/accounts", accountsRouter);

// error handling
app.use((err, _, res, __) => {
	res.status(500).json(`This is not good! ${err.toString().toUpperCase()}`);
});
app.listen(3000, () => {
	console.log("--- server is connected ---");
});

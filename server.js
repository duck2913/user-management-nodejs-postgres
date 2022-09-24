const express = require("express");
const bodyParser = require("body-parser");

// middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRouter = require("./routes/authRoutes");

app.use("/auth", authRouter);

app.use((err, req, res, next) => {
	res.status(500).json(`This is not good! ${err.toString().toUpperCase()}`);
});
app.listen(3000);

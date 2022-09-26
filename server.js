console.clear();
const express = require("express");
const bodyParser = require("body-parser");

// middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRouter = require("./routes/authRoutes");
const accountsRouter = require("./routes/accountsRoutes");

app.use("/auth", authRouter);
app.use("/accounts", accountsRouter);

app.use((err, _, res, __) => {
	res.status(500).json(`This is not good! ${err.toString().toUpperCase()}`);
});
app.listen(3000, () => {
	console.log("--- server is connected ---");
});

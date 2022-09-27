const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get("/", tasksController.viewUsers);

module.exports = router;

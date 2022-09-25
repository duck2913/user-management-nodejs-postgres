const express = require("express");
const router = express.Router();

const accountsController = require("../controllers/accountsController");

router.get("/", accountsController.getUsers);

router.get("/:username", accountsController.getOneUser);

router.post("/", accountsController.createUser);

router.put("/:username", accountsController.updateUser);

router.delete("/:username", accountsController.deleteUser);

module.exports = router;

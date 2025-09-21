const { registerUser, login, findUser, findUsers, createNewAccessCode, validateAccessCode } = require("../Controllers/authController");

const express = require("express");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/finduser", findUser);
router.post("/findusers", findUsers);
router.post("/createnewaccesscode", createNewAccessCode);
router.post("/validateaccesscode", validateAccessCode);

module.exports = router;
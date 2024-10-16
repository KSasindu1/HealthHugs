const express = require('express');
const router = express.Router();
const LoginController = require("../Controllers/LoginController");

router.post('/', LoginController.addLogin);

module.exports = router;
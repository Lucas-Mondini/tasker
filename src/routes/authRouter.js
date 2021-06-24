const { Router }        = require('express');
const authController    = require("../controllers/authController");
const authRouter = Router();


authRouter.post("/login", authController.Login);

module.exports = authRouter;
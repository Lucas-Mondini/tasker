const { Router }        = require('express');
const teamController    = require("../controllers/teamController");
const teamRouter = Router();
const authMiddleware = require("../middleware/authMiddleware");

teamRouter.post("/", authMiddleware, teamController.Create)

teamRouter.get("/:id", authMiddleware, teamController.Get)

teamRouter.get("/", authMiddleware, teamController.Index)

teamRouter.patch("/:id", authMiddleware, teamController.Update)

teamRouter.delete("/:id", authMiddleware, teamController.Delete)



module.exports = teamRouter;
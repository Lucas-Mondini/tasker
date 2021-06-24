const { Router }        = require('express');
const positionController    = require("../controllers/positionController");
const positionRouter = Router();
const authMiddleware = require("../middleware/authMiddleware");

positionRouter.post("/", authMiddleware, positionController.Create)

positionRouter.get("/:id", authMiddleware, positionController.Get)

positionRouter.get("/", authMiddleware, positionController.Index)

positionRouter.patch("/:id", authMiddleware, positionController.Update)

positionRouter.delete("/:id", authMiddleware, positionController.Delete)



module.exports = positionRouter;
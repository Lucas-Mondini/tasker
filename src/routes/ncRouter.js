const { Router }        = require('express');
const ncController    = require("../controllers/ncController");
const ncRouter = Router();
const authMiddleware = require("../middleware/authMiddleware");

ncRouter.post("/", authMiddleware, ncController.Create)

ncRouter.get("/:id", authMiddleware, ncController.Get)

ncRouter.get("/", authMiddleware, ncController.Index)

ncRouter.patch("/:id", authMiddleware, ncController.Update)

ncRouter.delete("/:id", authMiddleware, ncController.Delete)



module.exports = ncRouter;
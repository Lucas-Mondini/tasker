const { Router }        = require('express');
const userController    = require("../controllers/userController");
const userRouter = Router();
const authMiddleware = require("../middleware/authMiddleware");


userRouter.post("/", authMiddleware, userController.Create)

userRouter.get("/:id", authMiddleware, userController.Get)

userRouter.get("/", authMiddleware, userController.Index)

userRouter.patch("/:id", authMiddleware, userController.Update)

userRouter.delete("/:id", authMiddleware, userController.Delete)



module.exports = userRouter;
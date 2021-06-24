const { Router }        = require('express');
const userRouter        = require('./userRouter');
const teamRouter        = require('./teamRouter');
const positionRouter    = require('./positionRouter');
const ncRouter          = require('./ncRouter');
const authRouter        = require('./authRouter');
const mainRouter        = Router();

mainRouter.use("/users", userRouter);

mainRouter.use("/teams", teamRouter);

mainRouter.use("/position", positionRouter);

mainRouter.use("/nc", ncRouter);

mainRouter.use("/auth", authRouter);


module.exports = mainRouter;
import { Router } from "express";
import * as UserController from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/me", authMiddleware, UserController.getMe);
userRouter.patch("/me", authMiddleware, UserController.updateMe);

export default userRouter;

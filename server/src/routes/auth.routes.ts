import { Router } from "express";
import * as AuthController from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/auth/register", AuthController.register);
authRouter.post("/auth/login", AuthController.login);
authRouter.patch(
  "/auth/password",
  authMiddleware,
  AuthController.changePassword
);
authRouter.post("/auth/email", AuthController.chekEmail);

export default authRouter;

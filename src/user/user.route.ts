import Route from "express";
import tokenAuth from "../middleware/tokenAuth";
import { loginValidation, registerValidation } from "../middleware/validation";
import validationResult from "../middleware/validationResult";
import UserController from "./user.controller";

export const userRouter = Route();

userRouter.get("/user", UserController.getAll);
userRouter.get("/user/:id", tokenAuth, UserController.getOneById);
userRouter.post(
  "/auth/register",
  registerValidation,
  validationResult,
  UserController.register
);
userRouter.post(
  "/auth/login",
  loginValidation,
  validationResult,
  UserController.login
);
userRouter.put("/user/:id", UserController.update);
userRouter.delete("/user/:id", tokenAuth, UserController.delete);

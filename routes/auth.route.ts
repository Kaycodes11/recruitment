import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  signin,
  signup,
} from "../controllers/auth.controller";
import { ValidateSchema } from "../middlewares/validate-schema.middleware";
import { UserInsertSchema } from "../schemas/auth.schema";

const authRouter = Router();

authRouter.post("/signup", ValidateSchema(UserInsertSchema), signup);
authRouter.post("/signin", signin);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

export default authRouter;

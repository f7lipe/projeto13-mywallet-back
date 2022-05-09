import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const userRouter = Router()
userRouter.get('/user', validateToken, getUser)
export default userRouter
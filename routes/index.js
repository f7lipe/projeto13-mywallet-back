import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import transactionRouter from "./transactionRouter.js";

const router = Router()
router.use(userRouter)
router.use(authRouter)
router.use(transactionRouter)




export default router
import { Router } from "express";
import commentRouter from "./commentRouter";
import userRouter from "./userRouter";
import postRouter from "./postRouter";
const router = Router();

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

export default router;

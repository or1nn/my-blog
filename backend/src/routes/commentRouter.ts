import { Router } from "express";
import commentController from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, commentController.create);
router.get("/", commentController.get);
router.get("/last", commentController.getLast);
router.delete("/:id", authMiddleware, commentController.delete);

export default router;

import { Router } from "express";
import postController from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.patch("/:id", authMiddleware, postController.update);
router.delete("/:id", authMiddleware, postController.delete);

export default router;

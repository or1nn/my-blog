import { Router } from "express";
import userController from "../controllers/userController";
import { validateRegistration } from "../middlewares/validation";
import errorValidationHandler from "../middlewares/errorValidationHandler";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/registration",
  validateRegistration,
  errorValidationHandler,
  userController.registration
);
router.post("/login", userController.login);
router.post("/newAvatar", authMiddleware, userController.newAvatar);
router.get("/auth", authMiddleware, userController.check);

export default router;

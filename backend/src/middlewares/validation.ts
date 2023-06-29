import { body } from "express-validator";

export const validateRegistration = [
  body("username", "Имя пользователя не может быть пустым").isLength({
    min: 3,
    max: 20,
  }),
  body("email", "Некорректный E-mail").notEmpty().isEmail(),
  body("password", "Некорректный пароль").isLength({ min: 6, max: 24 }),
];

import path from "path";
import { Request, Response } from "express";
import { User } from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { key } from "../private";
import { v4 as uuidv4 } from "uuid";

const generateJwt = (
  id: number,
  username: string,
  email: string,
  role: string,
  avatar: string
) => {
  return jwt.sign({ id, username, email, role, avatar }, key, {
    expiresIn: "24h",
  });
};

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: any = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json("Неверный e-mail или пароль");
      }
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(400).json("Неверный e-mail или пароль");
      }
      const token = generateJwt(
        user.id,
        user.username,
        user.email,
        user.role,
        user.avatar
      );
      return res.status(200).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      res.status(500).json(`Ошибка входа ${e}`);
    }
  }
  async newAvatar(req: any, res: Response) {
    try {
      const { avatar } = req.files;
      const { id, username, email, role } = req.user;
      const fileName = uuidv4() + ".jpg";
      avatar.mv(
        path.resolve(__dirname, "..", "..", "static", "avatars", fileName)
      );
      await User.update({ avatar: fileName }, { where: { id } });
      const token = generateJwt(id, username, email, role, fileName);
      return res.status(200).json({
        token,
        user: {
          id,
          username,
          email,
          role,
          avatar: fileName,
        },
      });
    } catch (e) {
      res.json({ message: "ошибка при загрузке фото" });
    }
  }
  async registration(req: Request, res: Response) {
    try {
      const { email, username, password, role } = req.body;
      const candidate = await User.findOne({ where: { email, username } });
      if (candidate) {
        return res.status(400).json({
          message:
            "Пользователь с таким E-Mail`ом или именем уже зарегистрирован",
        });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user: any = await User.create({
        email,
        username,
        role,
        password: hashPassword,
      });

      const token = generateJwt(
        user.id,
        user.username,
        user.email,
        user.role,
        user.avatar
      );
      return res.status(200).json(token);
    } catch (e) {
      res.status(400).json({ message: `Не удалось зарегистироваться: ${e}` });
    }
  }
  async check(req: Request, res: Response) {
    const { role, username, email, id, avatar } = req.user;
    const token = generateJwt(id, username, email, role, avatar);
    return res.json({ token, user: { id, username, email, role, avatar } });
  }
}

export default new UserController();

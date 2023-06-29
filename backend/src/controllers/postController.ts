import { Request, Response } from "express";
import path from "path";
import { Post, User } from "../models/models";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

class PostContoller {
  async create(req: any, res: Response) {
    try {
      const { title, text } = req.body;

      const { img } = req.files;
      let fileName = uuidv4() + ".jpg";
      if (Array.isArray(img))
        return res.json({ message: "Ошибка загрузки файла" });
      if (img) {
        img.mv(path.resolve(__dirname, "..", "..", "static", "img", fileName));
      }
      const post = await Post.create({
        title,
        text,
        img: fileName,
        userId: req.user.id,
      });
      return res.status(200).json(post);
    } catch (e) {
      return res.status(200).json({ message: e });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, text } = req.body;
      const { img } = req.files || {};
      const fileName = uuidv4() + ".jpg";
      if (Array.isArray(img))
        return res.status(500).json({ message: "ошибка" });
      let post;
      if (img) {
        img.mv(path.resolve(__dirname, "..", "..", "static", "img", fileName));
        post = Post.update({ title, text, img: fileName }, { where: { id } });
      } else {
        post = Post.update({ title, text }, { where: { id } });
      }
      return res.status(200).json(post);
    } catch (e) {
      return res.status(400).json({ message: "Ошибка при изменении поста" });
    }
  }
  async delete(req: any, res: Response) {
    try {
      const { id } = req.params;
      let post;
      if (req.user.role === "ADMIN") {
        post = await Post.destroy({ where: { id } });
      }
      if (req.user.role === "USER") {
        post = await Post.destroy({ where: { id, userId: req.user.id } });
      }
      return res.status(200).json(post);
    } catch (e) {
      return res.status(400).json({ message: "Ошибка при удалении поста" });
    }
  }
  async getAll(
    req: Request<
      {},
      {},
      {},
      { sort: string; search: string; limit: string; page: string }
    >,
    res: Response
  ) {
    try {
      const { sort, search, limit, page } = req.query;
      let post;
      console.log("test", search);
      if (search) {
        post = await Post.findAndCountAll({
          limit: 3,
          include: [{ model: User }],
          order: [[sort, "DESC"]],
          where: {
            [Op.or]: [
              {
                title: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                text: {
                  [Op.iLike]: `%${search}%`,
                },
              },
            ],
          },
        });
      } else {
        post = await Post.findAndCountAll({
          limit: Number(limit),
          offset: Number(limit) * (Number(page) - 1),
          include: [{ model: User }],
          order: [[sort, "DESC"]],
        });
      }
      return res.status(200).json(post);
    } catch (e) {
      return res.status(400).json({ message: "Ошибка при получении постов" });
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post: any = await Post.findOne({
        where: { id },
        include: [{ model: User }],
      });
      await Post.update({ views: post.views + 1 }, { where: { id } });
      return res.status(200).json(post);
    } catch (e) {
      res.status(400).json({ message: "Ошибка при получении поста" });
    }
  }
}

export default new PostContoller();

import { Request, Response } from "express";
import { User, Post, Comment } from "../models/models";

class commentController {
  async create(
    req: Request<{}, {}, { content: string }, { postId: string }>,
    res: Response
  ) {
    try {
      const { content } = req.body;
      const { postId } = req.query;
      const comment = await Comment.create({
        userId: req.user.id,
        content,
        postId,
      });
      return res.status(200).json(comment);
    } catch (e) {
      return res
        .status(400)
        .json({ message: "ошибка при создании комментария" });
    }
  }
  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      let comment;
      if (req.user.role === "ADMIN") {
        comment = await Comment.destroy({ where: { id } });
      }
      if (req.user.role === "USER") {
        comment = await Comment.destroy({ where: { id, userId } });
      }
      return res.status(200).json(comment);
    } catch (e) {
      return res
        .status(400)
        .json({ message: `ошибка при удалении поста ${e}` });
    }
  }
  async get(req: Request<{ postId: string; userId: string }>, res: Response) {
    try {
      const { postId, userId } = req.query;
      let comments;
      if (postId) {
        comments = await Comment.findAll({
          where: { postId },
          include: [{ model: User }],
          order: [["createdAt", "DESC"]],
        });
      }
      if (userId) {
        comments = await Comment.findAll({
          where: { userId },
          include: [{ model: User }, { model: Post }],
          order: [["createdAt", "DESC"]],
          limit: 10,
        });
      }
      return res.status(200).json(comments);
    } catch (e) {
      return res
        .status(400)
        .json({ message: `Ошибка при получении комментариев ${e}` });
    }
  }
  async getLast(_: Request, res: Response) {
    try {
      const comments = await Comment.findAll({
        limit: 10,
        include: [{ model: User }, { model: Post }],
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(comments);
    } catch (e) {
      return res
        .status(400)
        .json({ message: `Ошибка при получении комментариев ${e}` });
    }
  }
}

export default new commentController();

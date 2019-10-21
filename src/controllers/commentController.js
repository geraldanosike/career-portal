import Comment from "../models/comment";
import BaseRepository from "../repositories/baseRepository";
import dotenv from "dotenv";

dotenv.config();
class CommentController {
  /**
   * @description creates a new Comment
   * @param  {object} req
   * @param {object} res
   * @returns {object} a newly created Comment
   * @memberof CommentController
   */

  static async createComment(req, res) {
    try {
      const { comment } = req.body;

      const options = {
        comment
        // ,
        // commentsUnderBlogPost: req.currentUser._id
      };

      const createComment = await BaseRepository.create(Comment, options);
      return res.status(201).send(createComment);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Get all Comment
   * @param  {object} req
   * @param {object} res
   * @returns {object}All Comment
   * @memberof CommentController
   */

  static async getAllComment(req, res) {
    try {
      // set pagination parameters
      const { limit = 5, page = 1 } = req.query;
      const options = { limit: Number(limit), page };

      const allComments = await BaseRepository.findAll(Comment, {}, options);
      return res.status(200).send(allComments);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Get a Comment
   * @param  {object} req
   * @param {object} res
   * @returns {object}A Comment
   * @memberof CommentController
   */

  static async getAComment(req, res) {
    try {
      const { CommentsId } = req.params;

      const aComment = await BaseRepository.findById(Comment, { _id: CommentsId });

      if (!aComment) {
        return res.status(404).send("Comment not found");
      }

      if (aComment) {
        return res.status(200).send(aComment);
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }


  /**
   * @description Delete Comment
   * @param  {object} req
   * @param {object} res
   * @returns {object}Delete Comment
   * @memberof CommentController
   */

  static async deleteComment(req, res) {
    try {
      const { commentsId } = req.params;

      const deleteComment = await Comment.findByIdAndDelete({ _id: commentsId });
      if (!deleteComment) return res.status(404).send("Comment does not exist");

      if (deleteComment) return res.status(200).send("Comment deleted");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default CommentController;

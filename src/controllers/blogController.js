import Blog from "../models/blog";
import BaseRepository from "../repositories/baseRepository";
import dotenv from "dotenv";

dotenv.config();
class BlogController {
  /**
   * @description creates a new Blog
   * @param  {object} req
   * @param {object} res
   * @returns {object} a newly created Blog
   * @memberof BlogController
   */

  static async createBlog(req, res) {
    try {
      const { BlogDescription, BlogTitle } = req.body;

      const options = {
        BlogDescription,
        BlogTitle
      };

      const createBlog = await BaseRepository.create(Blog, options);
      return res.status(201).send(createBlog);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Get all Blog
   * @param  {object} req
   * @param {object} res
   * @returns {object}All Blog
   * @memberof BlogController
   */

  static async getAllBlog(req, res) {
    try {
      // set pagination parameters
      const { limit = 5, page = 1 } = req.query;
      const options = { limit: Number(limit), page };

      const allBlogs = await BaseRepository.findAll(Blog, {}, options);
      return res.status(200).send(allBlogs);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Get a Blog
   * @param  {object} req
   * @param {object} res
   * @returns {object}A Blog
   * @memberof BlogController
   */

  static async getABlog(req, res) {
    try {
      const { blogsId } = req.params;

      const aBlog = await BaseRepository.findById(Blog, { _id: blogsId });

      if (!aBlog) {
        return res.status(404).send("Blog not found");
      }

      if (aBlog) {
        return res.status(200).send(aBlog);
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Update a Blog
   * @param  {object} req
   * @param {object} res
   * @returns {object}Update A Blog
   * @memberof BlogController
   */

  static async updateABlog(req, res) {
    try {
      const { blogsId } = req.params;

      const {
        BlogDescription,
        BlogTitle,
        BlogResponsibilities,
        companyInformation,
        BlogType,
        salary
      } = req.body;

      const options = {
        BlogDescription,
        BlogTitle,
        BlogResponsibilities,
        companyInformation,
        BlogType,
        salary
      };
      const updateBlog = await BaseRepository.update(
        Blog,
        { _id: blogsId },
        options
      );

      if (!updateBlog) {
        return res.status(404).send("This Blog doesnt exist");
      }

      if (updateBlog) {
        return res.status(200).send(updateBlog);
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   *@description Get all  comments under blog
   *@param  {Object} req - Request sent to the router
   *@param  {object} res - Response sent from the controller
   *@returns {object} - all comments
   *@memberof MasterAgentController
   */

static async commentsUnderBlog(req, res){
    const { blogsId } = req.params

    const blog = await Blog.findById({_id: blogsId});

    if(!blog)  return res.status(404).send("Blog not found");

    const commentsUnderAblog =  await blog.populate('comments').execPopulate();
console.log(commentsUnderAblog);
    // if(!commentsUnderAblog)
        //   return res.status(200).send(commentsUnderAblog);

}

  /**
   * @description Delete Blog
   * @param  {object} req
   * @param {object} res
   * @returns {object}Delete Blog
   * @memberof BlogController
   */

  static async deleteBlog(req, res) {
    try {
      const { blogsId } = req.params;

      const deleteBlog = await Blog.findByIdAndDelete({ _id: blogsId });
      if (!deleteBlog) return res.status(404).send("Blog does not exist");

      if (deleteBlog) return res.status(200).send("Blog deleted");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default BlogController;

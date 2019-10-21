import blogController from "../controllers/blogController";
import { Router } from "express";
import auth from '../middlewares/auth';
const router = Router();

router.post("/createblog", blogController.createBlog);
router.get("/blogs", blogController.getAllBlog);
router.get("/blog/:blogsId", blogController.getABlog);
router.patch("/blog/:blogsId", blogController.updateABlog);
router.delete("/blog/:blogsId", blogController.deleteBlog);
router.get("/blog/:blogsId/comments", blogController.commentsUnderBlog);
export default router;

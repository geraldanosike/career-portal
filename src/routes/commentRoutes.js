import commentController from "../controllers/commentController";
import auth from '../middlewares/auth'
import { Router } from "express";
const router = Router();

router.post("/createcomment",  commentController.createComment);
router.get("/comments",  commentController.getAllComment);
// router.get("/comment/:commentsId", commentController.getAcomment);
// router.patch("/comment/:commentsId", commentController.updateAcomment);
router.delete("/comment/:commentsId", commentController.deleteComment);
export default router;

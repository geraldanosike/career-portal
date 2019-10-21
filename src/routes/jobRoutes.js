import jobController from '../controllers/jobsController';
import { Router } from "express";
const router = Router();


router.post("/createjob", jobController.createJobs);
router.get("/jobs", jobController.getAllJobs);
router.delete("/job/:JobsId", jobController.deleteJobs);
router.get("/job/:JobId", jobController.getAJob);
router.patch("/job/:JobId", jobController.updateAJob);

export default router;

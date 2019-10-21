import { Router } from "express";
import adminController from "../controllers/adminController";
import auth from "../middlewares/auth";
const router = Router();

router.post("/createadmin", adminController.createAdmin);
router.post("/loginadmin", adminController.loginAdmin);
router.get("/admin", adminController.getAllAdmin);
router.get("/currentadmin", auth.verifyAdminToken, adminController.current);
router.delete("/deleteadmin/:userId" , adminController.deleteAdmin);
router.post("/logoutadmin",auth.verifyAdminToken, adminController.LogoutAdmin);

export default router;

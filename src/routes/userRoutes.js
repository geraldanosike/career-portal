import { Router } from 'express';
import userController from '../controllers/userController';
import auth from '../middlewares/auth'
const router = Router();


router.post('/createuser', userController.createUser);
router.post('/loginuser', userController.loginUser);
router.get('/users', userController.getAllUser);
router.get('/currentuser', auth.verifyUserToken, userController.current);
router.delete('/deleteuser/:userId', userController.deleteUser);
router.post("/logout",auth.verifyUserToken, userController.LogoutUser);




export default router;

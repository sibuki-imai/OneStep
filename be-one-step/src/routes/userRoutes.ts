import express from 'express';
import userController from '../modules/user/userController';

const router = express.Router();
router.post('/registration', userController.Registration);
router.post('/registration/email', userController.EmailRegistration);
router.post('/registration/email/login', userController.EmailLogin);

router.patch('/updata', userController.Promotion);

export default router;

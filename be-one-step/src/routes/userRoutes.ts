import express from 'express';
import userController from '../modules/user/userController';

const router = express.Router();

// router.post('/add', userController.UserAdd);
router.get('/certification', userController.UserCertification);
router.get('/information', userController.GoogleUser);

export default router;

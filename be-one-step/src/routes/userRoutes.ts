import express from 'express';
import userController from '../modules/user/userController';

const router = express.Router();

router.post('/add', userController.UserAdd);

export default router;

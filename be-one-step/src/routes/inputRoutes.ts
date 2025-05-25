import express from 'express';
import userController from '../modules/input/inputController';

const router = express.Router();
router.post('/new', userController.create);

export default router;

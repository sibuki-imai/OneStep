import express from 'express';
import inputController from '../modules/input/inputController';

const router = express.Router();
router.post('/new', inputController.create);
router.get('/correction/:moneyid', inputController.oneGet);
router.patch('/correction/:moneyId', inputController.correction);
export default router;

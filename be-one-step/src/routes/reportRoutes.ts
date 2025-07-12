import express from 'express';
import reportController from '../modules/report/reportController';

const router = express.Router();
router.get('/all/get', reportController.allGet);

export default router;

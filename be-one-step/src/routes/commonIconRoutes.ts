import express from 'express';
import IconController from '../modules/icon/iconController';

const router = express.Router();

router.get('/all', IconController.allIcon); // アイコンの全取得

export default router;

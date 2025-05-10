import express from 'express';
import IconCustomController from '../modules/iconCustom/iconCustomController';

const router = express.Router();

router.post('/certification', IconCustomController.conRegistration);
router.get('/current-situation', IconCustomController.currentSituation);
router.delete('/item-delete', IconCustomController.itemDelete);
router.patch('/item-change', IconCustomController.itemChange);

export default router;

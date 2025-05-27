import express from 'express';
import IconCustomController from '../modules/iconCustom/iconCustomController';

const router = express.Router();

router.post('/certification', IconCustomController.conRegistration);
router.get('/current-situation', IconCustomController.currentSituation);
router.get('/one/custom/icon/:customid', IconCustomController.oneGet);
router.delete('/item-delete', IconCustomController.itemDelete);
router.patch('/item-change', IconCustomController.itemChange); // 要動作確認
router.patch('/list/registration', IconCustomController.registration);

export default router;

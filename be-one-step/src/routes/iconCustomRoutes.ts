import express from 'express';
import IconCustom from '../modules/iconCustom/iconCustomController';

const router = express.Router();

router.post('/certification', IconCustom.conRegistration);
router.get('/current-situation', IconCustom.currentSituation);
router.delete('/item-delete', IconCustom.itemDelete);

export default router;

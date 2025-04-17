import express from 'express';
import IconCustom from '../modules/iconCustom/iconCustomController';

const router = express.Router();

router.post('/certification', IconCustom.conRegistration);

export default router;

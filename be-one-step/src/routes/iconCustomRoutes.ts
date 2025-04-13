import express from 'express';
import auth from '../modules/iconCustom/iconCustomController';

const router = express.Router();

router.get('/certification', auth.UserCertification);
router.get('/information', auth.GoogleUser);
router.get('/basic/information', auth.UserInformation);

export default router;

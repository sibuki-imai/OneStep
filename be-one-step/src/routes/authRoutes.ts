import express from 'express';
import auth from '../modules/certification/auth';
import registration from '../modules/certification/registration';

const router = express.Router();

router.get('/certification', auth.UserCertification);
router.get('/information', auth.GoogleUser);
router.get('/basic/information', auth.UserInformation);
router.post('/registration', registration.Registration);

export default router;

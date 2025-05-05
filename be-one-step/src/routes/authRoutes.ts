import express from 'express';
import auth from '../modules/certification/auth';

const router = express.Router();

router.get('/certification', auth.UserCertification);
router.get('/information', auth.GoogleUser);
router.get('/basic/information', auth.UserInformation);
router.get('/inquiry/confirmation', auth.InquiryConfirmation);

export default router;

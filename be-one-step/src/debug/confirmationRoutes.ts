import express from 'express';
import debug from './confirmationFile';
const router = express.Router();

router.get('/connect', debug.Connect);

export default router;

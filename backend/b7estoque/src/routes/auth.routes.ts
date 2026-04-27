import { authMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express";
import * as authController from '../controllers/auth.controller';


const router = Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.getMe);

export default router;
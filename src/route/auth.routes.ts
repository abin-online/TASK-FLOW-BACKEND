import { Router } from 'express';
import { registerUser, verifyUser, loginUser, refreshToken } from '../controller/auth.controller'
const router = Router();

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);

export default router;

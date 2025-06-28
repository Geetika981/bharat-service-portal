import express from 'express';
import { register, login, logout, getProfile } from '../controllers/auth.controllers.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', protect, getProfile);


export default router;

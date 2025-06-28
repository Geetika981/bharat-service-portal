import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/admin.middleware.js';
import { createService, deleteService, getAllBookings, getAllServices, listUsers, toggleApproval, updateService } from '../controllers/admin.controllers.js';
const router = express.Router();

router.use(protect, isAdmin);

router.post('/services', createService);
router.get('/services', getAllServices);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);
router.put('/services/:id/toggle', toggleApproval);
router.get('/bookings', getAllBookings);

router.get('/users', listUsers);

export default router;

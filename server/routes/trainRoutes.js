import express from 'express';
import { addTrain, getAvailability, bookSeat } from '../controllers/trainController.js';
import { protect, admin, apiKeyAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', [protect, admin, apiKeyAuth], addTrain);
router.get('/availability', getAvailability);
router.post('/book', protect, bookSeat);

export default router;
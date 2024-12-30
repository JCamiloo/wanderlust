import { Router } from 'express';
import { getAllMetrics } from '../controllers/metrics-controller.js';

const router = Router();

router.get('/', getAllMetrics);

export default router;


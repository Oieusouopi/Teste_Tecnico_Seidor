import { Router } from 'express';
import automovelRouter from './automovelRouter';

const router = Router();

router.use("/automovel", automovelRouter);

export default router;
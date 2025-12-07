import { Router } from 'express';
import automovelRouter from './automovelRouter';
import motoristaRouter from './motoristaRouter';

const router = Router();

router.use("/automovel", automovelRouter);
router.use("/motorista", motoristaRouter);
router.use("/automovelUtilizado",)

export default router;
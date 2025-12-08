import { Router } from 'express';
import automovelRouter from './automovelRouter';
import motoristaRouter from './motoristaRouter';
import automovelUtilizado from './automovelUtilizadoRouter';

const router = Router();

router.use("/automovel", automovelRouter);
router.use("/motorista", motoristaRouter);
router.use("/automovelUtilizado", automovelUtilizado)

export default router;
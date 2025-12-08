import { Router } from "express";
import { automovelUtilizadoController } from "../dependencies/automovelUtilizado.dependencies";

const automovelUtilizado = Router();

automovelUtilizado.post('/criar', automovelUtilizadoController.criarAutomovelUtilizado);
automovelUtilizado.patch('/finalizarUtilizacao/:motoristaId', automovelUtilizadoController.finalizarUtilizacaoPor);

export default automovelUtilizado;
import { Router } from "express";
import { automovelUtilizadoController } from "../dependencies/automovelUtilizado.dependencies";

const automovelUtilizado = Router();

automovelUtilizado.post('/criar', automovelUtilizadoController.criarAutomovelUtilizado);
automovelUtilizado.patch('/finalizarUtilizacao/:motoristaId', automovelUtilizadoController.finalizarUtilizacaoPor);
automovelUtilizado.get('/listar', automovelUtilizadoController.listar);

export default automovelUtilizado;
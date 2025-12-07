import { Router } from "express";
import { motoristaController } from "../dependencies/motoristas.dependencies";

const motoristaRouter = Router();

motoristaRouter.post('/criar', motoristaController.criarMotorista);

motoristaRouter.put('/atualizar/:id', motoristaController.atualizarMotorista);

motoristaRouter.delete('/deletar/:id', motoristaController.deletar);

motoristaRouter.get('/buscarPorId/:id', motoristaController.buscarPorId);

motoristaRouter.get('/listarPorFiltro', motoristaController.listarPorFiltro);

export default motoristaRouter;
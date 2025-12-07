import { Router } from "express";
import { AutomovelRepositoryMemory } from "../repositories/automovel/AutomovelRepositoryMemory";
import { AutomovelService } from "../service/AutomovelService";
import { AutomovelController } from "../controller/AutomovelController";
import { IAutomovelRepository } from "../repositories/automovel/IAutomovelRepository";
import { automovelController } from "../dependencies/automovel.dependencies";

const automovelRouter = Router();

automovelRouter.post('/criar', automovelController.criarAutomovel);

automovelRouter.put('/atualizar/:placa', automovelController.atualizarAutomovel);

automovelRouter.delete('/deletar/:placa', automovelController.deletarAutomovel);

automovelRouter.get('/buscarPorPlaca/:placa', automovelController.buscarPorPlaca);

automovelRouter.get('/listarPorFiltro', automovelController.listarPorFiltro);

export default automovelRouter;
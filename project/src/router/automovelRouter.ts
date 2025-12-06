import { Router } from "express";
import { AutomovelRepositoryMemory } from "../repositories/automovel/AutomovelRepositoryMemory";
import { AutomovelService } from "../service/AutomovelService";
import AutomovelController from "../controller/AutomovelController";

const automovelRouter = Router();

const repository = new AutomovelRepositoryMemory();
const service = new AutomovelService(repository);
const controller = new AutomovelController(service);

automovelRouter.post('/', controller.criarAutomovel);

export default automovelRouter;
import { Router } from "express";
import { MotoristaRepositoryMemory } from "../repositories/motorista/MotoristaRepositoryMemory";
import { MotoristaService } from "../service/MotoristaService";
import { IMotoristaRepository } from "../repositories/motorista/IMotoristaRepository";
import { MotoristaController } from "../controller/MotoristaController";

const motoristaRouter = Router();

const repository: IMotoristaRepository = new MotoristaRepositoryMemory();
const service: MotoristaService = new MotoristaService(repository);
const controller: MotoristaController = new MotoristaController(service);

motoristaRouter.post('/criar', controller.criarMotorista);
motoristaRouter.put('/atualizar/:id', controller.atualizarMotorista);

export default motoristaRouter;
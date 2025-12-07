import { MotoristaController } from "../controller/MotoristaController";
import { IMotoristaRepository } from "../repositories/motorista/IMotoristaRepository";
import { MotoristaRepositoryMemory } from "../repositories/motorista/MotoristaRepositoryMemory";
import { MotoristaService } from "../service/MotoristaService";

const motoristaRepository: IMotoristaRepository = new MotoristaRepositoryMemory();
const motoristaService: MotoristaService = new MotoristaService(motoristaRepository);
const motoristaController: MotoristaController = new MotoristaController(motoristaService);

export {
    motoristaRepository,
    motoristaService,
    motoristaController
};
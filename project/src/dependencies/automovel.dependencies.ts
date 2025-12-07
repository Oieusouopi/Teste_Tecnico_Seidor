import { AutomovelRepositoryMemory } from "../repositories/automovel/AutomovelRepositoryMemory";
import { AutomovelService } from "../service/AutomovelService";
import { AutomovelController } from "../controller/AutomovelController";
import { IAutomovelRepository } from "../repositories/automovel/IAutomovelRepository";

const automovelRepository: IAutomovelRepository = new AutomovelRepositoryMemory();
const automovelService: AutomovelService = new AutomovelService(automovelRepository);
const automovelController: AutomovelController = new AutomovelController(automovelService);

export {
    automovelRepository,
    automovelService,
    automovelController
};
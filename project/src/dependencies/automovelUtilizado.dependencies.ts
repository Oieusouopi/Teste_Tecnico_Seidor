import { AutomovelUtilizadoRepositoryMemory } from "../repositories/automovel_utilizado/AutomovelUtilizadoRepositoryMemory";
import { AutomovelUtilizadoService } from "../service/AutomovelUtilizadoService";
import { AutomovelUtilizadoController } from "../controller/AutomovelUtilizadoController";
import { automovelService } from "./automovel.dependencies"; // Importa dependência
import { motoristaService } from "./motoristas.dependencies";

const automovelUtilizadoRepository = new AutomovelUtilizadoRepositoryMemory();
const automovelUtilizadoService = new AutomovelUtilizadoService(
    automovelUtilizadoRepository,
    automovelService,
    motoristaService
);
const automovelUtilizadoController = new AutomovelUtilizadoController(automovelUtilizadoService);

export {
    automovelUtilizadoRepository,
    automovelUtilizadoService,
    automovelUtilizadoController
};

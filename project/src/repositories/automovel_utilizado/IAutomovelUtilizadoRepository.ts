import { AutomovelUtilizado } from "../../models/AutomovelUtilizado";

export interface IAutomovelUtilizadoRepository {
    utilizarAutomovel(automovelUtilizado: AutomovelUtilizado): Promise<AutomovelUtilizado>;
}
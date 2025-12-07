import { AutomovelUtilizado } from "../../models/AutomovelUtilizado";

export interface IAutomovelUtilizadoRepository {
    criarAutomovelUtilizado(automovelUtilizado: AutomovelUtilizado): Promise<AutomovelUtilizado>;
    buscarMotoristaUtilizandoCarro(motoristId: number): Promise<AutomovelUtilizado | null>;
    buscarAutomovelUtilizado(automovelPlaca: string): Promise<AutomovelUtilizado | null>;
}
import { AutomovelUtilizado } from "../../models/AutomovelUtilizado";

export interface IAutomovelUtilizadoRepository {
    criarAutomovelUtilizado(automovelUtilizado: AutomovelUtilizado): Promise<AutomovelUtilizado>;
    buscarMotoristaUtilizandoCarroPor(motoristId: number): Promise<AutomovelUtilizado | null>;
    buscarAutomovelUtilizadoPor(automovelPlaca: string): Promise<AutomovelUtilizado | null>;
}
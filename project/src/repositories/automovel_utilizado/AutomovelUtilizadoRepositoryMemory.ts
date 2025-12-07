import { AutomovelUtilizado } from "../../models/AutomovelUtilizado";
import { IAutomovelUtilizadoRepository } from "./IAutomovelUtilizadoRepository";

export class AutomovelUtilizadoRepositoryMemory implements IAutomovelUtilizadoRepository {

    public automoveisUtilizados: AutomovelUtilizado[] = [];

    public async utilizarAutomovel(automovelUtilizado: AutomovelUtilizado): Promise<AutomovelUtilizado> {
        this.automoveisUtilizados.push(automovelUtilizado);
        
        return automovelUtilizado;
    }

}
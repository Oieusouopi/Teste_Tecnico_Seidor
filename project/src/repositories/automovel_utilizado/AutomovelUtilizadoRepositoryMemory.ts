import { AutomovelUtilizado } from "../../models/AutomovelUtilizado";
import { IAutomovelUtilizadoRepository } from "./IAutomovelUtilizadoRepository";

export class AutomovelUtilizadoRepositoryMemory implements IAutomovelUtilizadoRepository {

    public automoveisUtilizados: AutomovelUtilizado[] = [];

    public async criarAutomovelUtilizado(automovelUtilizado: AutomovelUtilizado): Promise<AutomovelUtilizado> {
        this.automoveisUtilizados.push(automovelUtilizado);

        return automovelUtilizado;
    }

    public async buscarMotoristaUtilizandoCarro(motoristId: number): Promise<AutomovelUtilizado | null> {
        const automovelUtilizado: AutomovelUtilizado | undefined = this.automoveisUtilizados.find((a) => a.motorista.id == motoristId && a.dataFinalUtilizacao == null);

        return automovelUtilizado || null;
    }

    public async buscarAutomovelUtilizado(automovelPlaca: string): Promise<AutomovelUtilizado | null> {
        const automovelUtilizado: AutomovelUtilizado | undefined = this.automoveisUtilizados.find((a) => a.automovel.placa == automovelPlaca && a.dataFinalUtilizacao == null);

        return automovelUtilizado || null;
    }

}
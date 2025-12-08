import { AutomovelUtilizado } from "../../models/AutomovelUtilizado";
import { IAutomovelUtilizadoRepository } from "./IAutomovelUtilizadoRepository";

export class AutomovelUtilizadoRepositoryMemory implements IAutomovelUtilizadoRepository {

    private automoveisUtilizados: AutomovelUtilizado[] = [];
    private proximoId: number = 1;

    public async criarAutomovelUtilizado(automovelUtilizado: AutomovelUtilizado): Promise<AutomovelUtilizado> {
        automovelUtilizado.id = this.proximoId;
        this.proximoId += 1;
        
        this.automoveisUtilizados.push(automovelUtilizado);

        return automovelUtilizado;
    }

    public async buscarMotoristaUtilizandoCarroPor(motoristId: number): Promise<AutomovelUtilizado | null> {
        const automovelUtilizado: AutomovelUtilizado | undefined = this.automoveisUtilizados.find((a) => a.motorista.id == motoristId && a.dataFinalUtilizacao == null);

        return automovelUtilizado || null;
    }

    public async buscarAutomovelUtilizadoPor(automovelPlaca: string): Promise<AutomovelUtilizado | null> {
        const automovelUtilizado: AutomovelUtilizado | undefined = this.automoveisUtilizados.find((a) => a.automovel.placa == automovelPlaca && a.dataFinalUtilizacao == null);

        return automovelUtilizado || null;
    }

    public async finalizarUtilizacaoPor(motoristaId: number): Promise<void> {
        const index = this.automoveisUtilizados.findIndex(a => a.motorista.id == motoristaId);

        const automovelUtilizado = this.automoveisUtilizados[index];

        automovelUtilizado.dataFinalUtilizacao = new Date();
    }

    public async listar(): Promise<AutomovelUtilizado[]> {
        return this.automoveisUtilizados;
    }
}
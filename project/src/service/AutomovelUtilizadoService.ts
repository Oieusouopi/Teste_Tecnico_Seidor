import { Automovel } from "../models/Automovel";
import { AutomovelUtilizado } from "../models/AutomovelUtilizado";
import { Motorista } from "../models/Motorista";
import { IAutomovelUtilizadoRepository } from "../repositories/automovel_utilizado/IAutomovelUtilizadoRepository";
import { AutomovelService } from "./AutomovelService";
import { MotoristaService } from "./MotoristaService";

export class AutomovelUtilizadoService {

    constructor(
        private repository: IAutomovelUtilizadoRepository,
        private automovelService: AutomovelService,
        private motoristaService: MotoristaService,
    ) {}

    public async utilizarAutomovel(automovelUtilizado: AutomovelUtilizadoCriarDTO): Promise<AutomovelUtilizado> {

        if (!automovelUtilizado) {
            throw new Error('Dados são obrigatórios');
        }

        const {
            dataInicioUtilizacao,
            motoristaId,
            automovelPlaca,
        } = automovelUtilizado;

        if (!dataInicioUtilizacao) {
            throw new Error('Data de início da utilização é obrigatória');
        }

        if (!motoristaId || motoristaId <= 0) {
            throw new Error('ID do motorista é obrigatório');
        }

        if (!automovelPlaca || automovelPlaca.trim() === '') {
            throw new Error('A placa do automóvel é obrigatória');
        }

        if (await this.repository.buscarMotoristaUtilizandoCarroPor(automovelUtilizado.motoristaId) != null) {
            throw new Error('Motorista já esta utilizando algum automóvel');
        }

        if (await this.repository.buscarAutomovelUtilizadoPor(automovelUtilizado.automovelPlaca) != null) {
            throw new Error('Automóvel já esta sendo utilizado');
        }

        const motorista: Motorista = await this.motoristaService.buscarPorId(automovelUtilizado.motoristaId);
        const automovel: Automovel = await this.automovelService.buscarPorPlaca(automovelUtilizado.automovelPlaca);

        const automovelEntidade: AutomovelUtilizado = {
            id: null,
            dataFinalUtilizacao: null,
            dataInicioUtilizacao: new Date(automovelUtilizado.dataInicioUtilizacao),
            motivoUtilizacao: automovelUtilizado.motivoUtilizacao,
            motorista: motorista,
            automovel: automovel,
        }

        return await this.repository.criarAutomovelUtilizado(automovelEntidade);
    }

    public async finalizarUtilizacaoPor(motoristaId: number): Promise<void> {
        if (await this.repository.buscarMotoristaUtilizandoCarroPor(motoristaId) == null) {
            throw new Error('Motorista não esta utilizando algum automóvel');
        }

        return await this.repository.finalizarUtilizacaoPor(motoristaId);
    }

    public async listar(): Promise<AutomovelUtilizado[]> {
        return await this.repository.listar();
    }
}
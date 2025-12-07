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
        if (await this.repository.buscarMotoristaUtilizandoCarro(automovelUtilizado.motoristaId) != null) {
            throw new Error('Motorista já esta utilizando algum automóvel');
        }

        if (await this.repository.buscarAutomovelUtilizado(automovelUtilizado.automovelPlaca) != null) {
            throw new Error('Automóvel já esta sendo utilizado');
        }

        const motorista: Motorista = await this.motoristaService.buscarPorId(automovelUtilizado.motoristaId);
        const automovel: Automovel = await this.automovelService.buscarPorPlaca(automovelUtilizado.automovelPlaca);

        const automovelEntidade: AutomovelUtilizado = {
            id: null,
            dataFinalUtilizacao: automovelUtilizado.dataFinalUtilizacao,
            dataInicioUtilizacao: automovelUtilizado.dataInicioUtilizacao,
            motivoUtilizacao: automovelUtilizado.motivoUtilizacao,
            motorista: motorista,
            automovel: automovel,
        }

        return this.repository.criarAutomovelUtilizado(automovelEntidade);
    }
}
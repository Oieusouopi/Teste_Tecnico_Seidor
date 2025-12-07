import { MotoristaAtualizarDTO } from "../dto/MotoristaAtualizarDTO";
import { MotoristaFiltroDTO } from "../dto/MotoristaFiltroDTO";
import { Motorista } from "../models/Motorista";
import { IMotoristaRepository } from "../repositories/motorista/IMotoristaRepository";

export class MotoristaService {
    constructor(private repository: IMotoristaRepository) {}

    public async criarMotorista(motorista: Motorista) {
        if (!motorista) {
            throw new Error('Dados do motorista são obrigatórios');
        }

        const motoristaValido: Motorista = {
            id: motorista.id,
            nome: motorista.nome
        }

        return await this.repository.criar(motoristaValido);
    }

    public async atualizarMotorista(id: number, motorista: MotoristaAtualizarDTO) {
        if (!motorista) {
            throw new Error('Dados do motorista são obrigatorios');
        }

        const motoristaValido: MotoristaAtualizarDTO = {
            nome: motorista.nome,
        }

        return await this.repository.atualizar(id, motoristaValido);
    }

    public async deletar(id: number): Promise<void> {
        return this.repository.deletar(id);
    }

    public async buscarPorId(id: number): Promise<Motorista> {
        const motorista = await this.repository.buscarPorId(id);

        if (motorista == null) {
            throw new Error('Motorista não existe');
        }

        return motorista;
    }

    public async listarPorFiltro(motoristaFiltroDTO: MotoristaFiltroDTO): Promise<Motorista[]> {
        const filtroTratado = {
            nome: motoristaFiltroDTO.nome?.trim() || null,
        };

        return await this.repository.listarPorFiltro(filtroTratado);
    }

}
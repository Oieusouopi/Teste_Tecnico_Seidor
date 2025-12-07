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
}
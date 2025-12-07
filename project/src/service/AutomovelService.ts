import { Automovel } from "../models/Automovel";
import { IAutomovelRepository } from "../repositories/automovel/IAutomovelRepository";

export class AutomovelService {

    constructor(private repository: IAutomovelRepository) {}

    public async criarAutomovel(automovel: Automovel): Promise<Automovel> {
        if (!automovel) {
            throw new Error('Dados do automóvel são obrigatórios');
        }

        if (!automovel.placa) {
            throw new Error('Automóvel sem placa');
        }
    
        if (await this.repository.buscarPorPlaca(automovel.placa) != null) {
            throw new Error('Automóvel já existe');
        }

        const automovelValido: Automovel = {
            placa: automovel.placa,
            marca: automovel.marca,
            cor: automovel.cor,
        }

        return await this.repository.criar(automovelValido);
    }

    public async atualizar(automovel: Automovel): Promise<Automovel> {
        if (!automovel) {
            throw new Error('Dados do automóvel são obrigatórios');
        }

        if (!automovel.placa) {
            throw new Error('Automovel sem placa');
        }

        if (await this.repository.buscarPorPlaca(automovel.placa) == null) {
            throw new Error('Automovel não existe');
        }

        const automovelValido: Automovel = {
            placa: automovel.placa,
            marca: automovel.marca,
            cor: automovel.cor,
        }

        return await this.repository.atualizar(automovelValido);
    }

    public async deletar(placa: string): Promise<void> {
        return await this.repository.deletar(placa);
    }
}
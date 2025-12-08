import { AutomovelAtualizarDTO } from "../dto/AutomovelAtualizarDTO";
import { AutomovelFiltroDTO } from "../dto/AutomovelFiltroDTO";
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

        if (!automovel.marca || automovel.marca.trim() === '') {
            throw new Error('Marca do automóvel é obrigatório');
        }

        if (!automovel.cor || automovel.cor.trim() === '') {
            throw new Error('Cor do automóvel é obrigatório');
        }

        const automovelValido: Automovel = {
            placa: automovel.placa,
            marca: automovel.marca,
            cor: automovel.cor,
        }

        return await this.repository.criar(automovelValido);
    }

    public async atualizar(placa: string, automovel: AutomovelAtualizarDTO): Promise<Automovel> {
        if (!automovel) {
            throw new Error('Dados do automóvel são obrigatórios');
        }

        if (!placa) {
            throw new Error('Automovel sem placa');
        }

        if (await this.repository.buscarPorPlaca(placa) == null) {
            throw new Error('Automovel não existe');
        }

        const automovelValido: AutomovelAtualizarDTO = {
            marca: automovel.marca,
            cor: automovel.cor,
        }

        return await this.repository.atualizar(placa, automovelValido);
    }

    public async deletar(placa: string): Promise<void> {
        return await this.repository.deletar(placa);
    }

    public async buscarPorPlaca(placa: string): Promise<Automovel> {
        const automovel = await this.repository.buscarPorPlaca(placa);
        if (automovel == null) {
            throw new Error('Automovel não existe');
        }

        return automovel;
    }

    public async listarPorFiltro(automovelFiltroDTO: AutomovelFiltroDTO): Promise<Automovel[]> {

        const filtroTratado = {
            cor: automovelFiltroDTO.cor?.trim() || null,
            marca: automovelFiltroDTO.marca?.trim() || null
        };

        return await this.repository.listarPorFiltos(filtroTratado);
    }
}
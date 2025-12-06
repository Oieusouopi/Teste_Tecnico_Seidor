import { Automovel } from "../models/Automovel";
import { IAutomovelRepository } from "../repositories/automovel/IAutomovelRepository";

export class AutomovelService {

    constructor(private repository: IAutomovelRepository) {}

    public async criarAutomovel(automovel: Automovel): Promise<Automovel> {
        return await this.repository.criar(automovel);
    }
}
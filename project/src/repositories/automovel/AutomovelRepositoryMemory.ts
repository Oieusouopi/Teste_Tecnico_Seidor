import { Automovel } from "../../models/Automovel";
import { IAutomovelRepository } from "./IAutomovelRepository";

export class AutomovelRepositoryMemory implements IAutomovelRepository {
    private automoveis: Automovel[] = [];

    public async criar(automovel: Automovel): Promise<Automovel> {
        this.automoveis.push(automovel);
        return automovel;
    }

    public async listar(): Promise<Automovel[]> {
        return this.automoveis;
    }

    public async buscarPorPlaca(placa: string): Promise<Automovel | null> {
        const automovel = this.automoveis.find(a => a.placa == placa);
        return automovel || null;
    }
}
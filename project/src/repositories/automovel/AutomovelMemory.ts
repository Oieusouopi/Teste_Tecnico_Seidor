import { Automovel } from "../../models/Automovel";
import { IAutomovelRepository } from "./IAutomovelRepository";

export class AutomovelMemory implements IAutomovelRepository {
    private automoveis: Automovel[] = [];

    public async criar(automovel: Automovel): Promise<Automovel> {
        this.automoveis.push(automovel);
        return automovel;
    }
}
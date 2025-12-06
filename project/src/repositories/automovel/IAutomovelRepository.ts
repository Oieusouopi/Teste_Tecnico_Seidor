import { Automovel } from "../../models/Automovel";

export interface IAutomovelRepository {
    criar(automovel: Automovel): Promise<Automovel>;
}
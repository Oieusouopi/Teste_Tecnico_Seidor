import { Automovel } from "../../models/Automovel";

export interface IAutomovelRepository {
    criar(automovel: Automovel): Promise<Automovel>;
    listar(): Promise<Automovel[]>;
    buscarPorPlaca(placa: string): Promise<Automovel | null>;
    atualizar(Automovel: Automovel): Promise<Automovel>;
}
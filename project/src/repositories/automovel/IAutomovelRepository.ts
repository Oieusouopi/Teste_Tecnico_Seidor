import { AutomovelAtualizarDTO } from "../../dto/AutomovelAtualizarDTO";
import { Automovel } from "../../models/Automovel";

export interface IAutomovelRepository {
    criar(automovel: Automovel): Promise<Automovel>;
    listar(): Promise<Automovel[]>;
    buscarPorPlaca(placa: string): Promise<Automovel | null>;
    atualizar(placa: string, Automovel: AutomovelAtualizarDTO): Promise<Automovel>;
    deletar(placa: string): Promise<void>
}
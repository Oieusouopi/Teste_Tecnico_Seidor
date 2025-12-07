import { AutomovelAtualizarDTO } from "../../dto/AutomovelAtualizarDTO";
import { AutomovelFiltroDTO } from "../../dto/AutomovelFiltroDTO";
import { Automovel } from "../../models/Automovel";

export interface IAutomovelRepository {
    criar(automovel: Automovel): Promise<Automovel>;
    listar(): Promise<Automovel[]>;
    buscarPorPlaca(placa: string): Promise<Automovel | null>;
    atualizar(placa: string, Automovel: AutomovelAtualizarDTO): Promise<Automovel>;
    deletar(placa: string): Promise<void>;
    listarPorFiltos(automovelFiltroDTO: AutomovelFiltroDTO): Promise<Automovel[]>;
}
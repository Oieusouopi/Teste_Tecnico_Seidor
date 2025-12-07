import { MotoristaAtualizarDTO } from "../../dto/MotoristaAtualizarDTO";
import { MotoristaFiltroDTO } from "../../dto/MotoristaFiltroDTO";
import { Motorista } from "../../models/Motorista";

export interface IMotoristaRepository {
    criar(motorista: Motorista): Promise<Motorista>;
    atualizar(id: number, motoristas: MotoristaAtualizarDTO): Promise<Motorista>;
    listar(): Promise<Motorista[]>;
    listarPorFiltro(motoristaFiltroDTO: MotoristaFiltroDTO): Promise<Motorista[]>;
    deletar(id: number): Promise<void>;
    buscarPorId(id: number): Promise<Motorista | null>;
}
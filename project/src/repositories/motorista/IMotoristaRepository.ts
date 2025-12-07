import { MotoristaAtualizarDTO } from "../../dto/MotoristaAtualizarDTO";
import { Motorista } from "../../models/Motorista";

export interface IMotoristaRepository {
    criar(motorista: Motorista): Promise<Motorista>;
    atualizar(id: number, motoristas: MotoristaAtualizarDTO): Promise<Motorista>;
}
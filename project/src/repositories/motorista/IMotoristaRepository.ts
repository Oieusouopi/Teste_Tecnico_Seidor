import { Motorista } from "../../models/Motorista";

export interface IMotoristaRepository {
    criar(automovel: Motorista): Promise<Motorista>;
}
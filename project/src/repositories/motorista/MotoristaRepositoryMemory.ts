import { Motorista } from "../../models/Motorista";
import { IMotoristaRepository } from "./IMotoristaRepository";

export class MotoristaRepositoryMemory implements IMotoristaRepository {
    
    private motoristas: Motorista[] = [];
    private proximoId: number = 1;

    
    public async criar(motorista: Motorista): Promise<Motorista> {
        motorista.id = this.proximoId;
        this.proximoId += 1;

        this.motoristas.push(motorista);
        return motorista;
    }
}
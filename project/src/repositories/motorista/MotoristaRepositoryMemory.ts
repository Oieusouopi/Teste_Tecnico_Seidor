import { MotoristaAtualizarDTO } from "../../dto/MotoristaAtualizarDTO";
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

    public async atualizar(id: number, motoristaAtualizado: MotoristaAtualizarDTO): Promise<Motorista> {
        const index = this.motoristas.findIndex(m => m.id === id);

        const motoristaExistente: Motorista = this.motoristas[index];
        Object.assign(motoristaExistente, motoristaAtualizado);

        return motoristaExistente;
    }

    public async deletar(id: number): Promise<void> {
        this.motoristas = this.motoristas.filter(m => m.id != id);
    }

    public async listar(): Promise<Motorista[]> {
        return this.motoristas;
    }
}
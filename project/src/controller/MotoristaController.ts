import { MotoristaAtualizarDTO } from "../dto/MotoristaAtualizarDTO";
import { Motorista } from "../models/Motorista";
import { MotoristaService } from "../service/MotoristaService";
import { Request, Response } from "express";

export class MotoristaController {

    constructor(private service: MotoristaService) {}

    public criarMotorista = async (req: Request, res: Response) => {
        try {
            const dados: Motorista = req.body;
            const motorista: Motorista = await this.service.criarMotorista(dados);
            
            res.status(201).json({
                sucesso: true,
                dados: motorista
            });
        } catch (error) {
            res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
    
    public atualizarMotorista = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            const dados: MotoristaAtualizarDTO = req.body;
            const motorista: Motorista = await this.service.atualizarMotorista(id, dados);
            
            res.status(201).json({
                sucesso: true,
                dados: motorista
            })

        } catch (error) {
            res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    public deletar = async (req: Request, res: Response) => {
        try {
            const id:  number = Number(req.params.id);
            await this.service.deletar(id);

            res.status(201).json({
                sucesso: true,
            })
        } catch (error) {
            res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    public buscarPorId = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            const motorista: Motorista = await this.service.buscarPorId(id);
            
            res.status(201).json({
                sucesso: true,
                dado: motorista,
            })
        } catch (error) {
            res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

}
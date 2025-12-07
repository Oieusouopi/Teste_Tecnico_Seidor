import { Request, Response } from "express";
import { AutomovelService } from "../service/AutomovelService";
import { Automovel } from "../models/Automovel";
import { AutomovelAtualizarDTO } from "../dto/AutomovelAtualizarDTO";

export class AutomovelController  {
    constructor(private service: AutomovelService) {}

    public criarAutomovel = async (req: Request, res: Response): Promise<void> => {
        try {
            const dados: Automovel = req.body;
            const automovel: Automovel = await this.service.criarAutomovel(dados);
            
            res.status(201).json({
                sucesso: true,
                dados: automovel
            });
        } catch (error) {
            res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    public atualizarAutomovel = async (req: Request, res: Response): Promise<void> => {
        try {
            const placa: string = req.params.placa;
            const dados: AutomovelAtualizarDTO = req.body;
            const automovel: Automovel = await this.service.atualizar(placa, dados);

            res.status(201).json({
                sucesso: true,
                dados: automovel
            })
        } catch (error) {
            res.status(400).json({
                sucesso: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    public deletarAutomovel = async (req: Request, res: Response): Promise<void> => {
        try {
            const placa: string = req.params.placa;
            await this.service.deletar(placa);

        } catch (error) {
            res.status(400).json({
                sucesso: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

}
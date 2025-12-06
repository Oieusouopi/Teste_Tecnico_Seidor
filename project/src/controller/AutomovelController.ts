import { Request, Response } from "express";
import { AutomovelService } from "../service/AutomovelService";

export default class AutomovelController {
    constructor(private service: AutomovelService) {}

     public criarAutomovel = async (req: Request, res: Response): Promise<void> => {
        try {
            const dados = req.body;
            const automovel = await this.service.criarAutomovel(dados);
            
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

}
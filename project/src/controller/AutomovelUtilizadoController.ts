import { AutomovelUtilizado } from "../models/AutomovelUtilizado";
import { AutomovelUtilizadoService } from "../service/AutomovelUtilizadoService";
import { Request, Response } from "express";

export class AutomovelUtilizadoController {

    constructor(private service: AutomovelUtilizadoService) {}

    public criarAutomovelUtilizado = async (req: Request, res: Response) => {
        try {
            const dados: AutomovelUtilizadoCriarDTO = req.body;
            const automovelUtilizado: AutomovelUtilizado = await this.service.utilizarAutomovel(dados);
            
            res.status(201).json({
                sucesso: true,
                dados: automovelUtilizado
            });
        } catch (error) {
             res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
}
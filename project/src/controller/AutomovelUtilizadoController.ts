import { AutomovelUtilizadoCriarDTO } from "../dto/AutomovelUtilizadoCriarDTO";
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

    public finalizarUtilizacaoPor = async (req: Request, res: Response) => {
        try {

            const motoristaId: number = Number(req.params.motoristaId);
            await this.service.finalizarUtilizacaoPor(motoristaId);

            res.status(201).json({
                sucesso: true,
            });
        } catch (error) {
            res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    public listar = async (req: Request, res: Response) => {
        try {
            const dados = await this.service.listar();

            res.status(201).json({
                sucesso: true,
                dados: dados
            });
        } catch (error) {
            res.status(400).json({
                sucesso: false,
                erro: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
}
import { AutomovelController } from "../../../controller/AutomovelController";
import { AutomovelService } from "../../../service/AutomovelService";
import { Request, Response } from "express";
import { Automovel } from "../../../models/Automovel";

describe('AutomovelController', () => {
    let controller: AutomovelController;
    let mockService: Partial<AutomovelService>;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        mockService = {
            criarAutomovel: jest.fn()
        };

        controller = new AutomovelController(mockService as AutomovelService);

        mockReq = {
            body: {}
        };

        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock }); // encadeamento res.status().json()

        mockRes = {
            status: statusMock as any,
            json: jsonMock as any
        };
    });

    it('deve criar um automóvel com sucesso', async () => {
        const automovel: Automovel = { placa: 'ABC-1234', marca: 'Fiat Uno', cor: 'azul' };
        mockReq.body = automovel;

        (mockService.criarAutomovel as jest.Mock).mockResolvedValueOnce(automovel);

        await controller.criarAutomovel(mockReq as Request, mockRes as Response);

        expect(mockService.criarAutomovel).toHaveBeenCalledWith(automovel);
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith({
            sucesso: true,
            dados: automovel
        });
    });

    it('deve retornar erro se o serviço lançar exceção', async () => {
        const erro = new Error('Placa já existe');
        mockReq.body = { placa: 'ABC-1234' };

        (mockService.criarAutomovel as jest.Mock).mockRejectedValueOnce(erro);

        await controller.criarAutomovel(mockReq as Request, mockRes as Response);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({
            sucesso: false,
            erro: 'Placa já existe'
        });
    });
});

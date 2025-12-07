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

    describe('criar', () => {
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

    describe('atualizar', () => {
        it('deve atualizar um automóvel com sucesso', async () => {
            const automovelAtualizado: Automovel = { placa: 'ABC-1234', marca: 'Fiat Uno', cor: 'vermelho' };
            mockReq.body = automovelAtualizado;

            (mockService.atualizar as jest.Mock) = jest.fn().mockResolvedValueOnce(automovelAtualizado);

            await controller.atualizarAutomovel(mockReq as Request, mockRes as Response);

            expect(mockService.atualizar).toHaveBeenCalledWith(automovelAtualizado);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: automovelAtualizado
            });
        });

        it('deve retornar erro se o serviço lançar exceção', async () => {
            const erro = new Error('Automóvel não encontrado');
            mockReq.body = { placa: 'XYZ-9999' };

            (mockService.atualizar as jest.Mock) = jest.fn().mockRejectedValueOnce(erro);

            await controller.atualizarAutomovel(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                error: 'Automóvel não encontrado'
            });
        });
    });


});

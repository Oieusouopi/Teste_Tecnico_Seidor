import { AutomovelController } from "../../../controller/AutomovelController";
import { AutomovelService } from "../../../service/AutomovelService";
import { Request, Response } from "express";
import { Automovel } from "../../../models/Automovel";
import { AutomovelAtualizarDTO } from "../../../dto/AutomovelAtualizarDTO";
import { AutomovelFiltroDTO } from "../../../dto/AutomovelFiltroDTO";

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
            const automovelAtualizado: AutomovelAtualizarDTO = { marca: 'Fiat Uno', cor: 'vermelho' };
            const automovelRetorno: Automovel = { placa: 'ABC-1234', marca: 'Fiat Uno', cor: 'vermelho' }
            const placa = 'ABC-1234';
            mockReq = {
                body: automovelAtualizado,
                params: { placa }
            };

            (mockService.atualizar as jest.Mock) = jest.fn().mockResolvedValueOnce(automovelRetorno);

            await controller.atualizarAutomovel(mockReq as Request, mockRes as Response);

            expect(mockService.atualizar).toHaveBeenCalledWith(placa, automovelAtualizado);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: automovelRetorno
            });
        });

        it('deve retornar erro se o serviço lançar exceção', async () => {
            const erro = new Error('Automóvel não encontrado');
            mockReq = {
                 params: { placa: 'XYZ-9999' }
            };

            (mockService.atualizar as jest.Mock) = jest.fn().mockRejectedValueOnce(erro);

            await controller.atualizarAutomovel(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                error: 'Automóvel não encontrado'
            });
        });
    });

    describe('deletar', () => {
        it('deletar um automóvel com sucesso', async () => {
            const placa = 'ABC-1234';
            mockReq.params = { placa };

            (mockService.deletar as jest.Mock) = jest.fn().mockResolvedValueOnce(undefined);

            await controller.deletarAutomovel(mockReq as Request, mockRes as Response);

            expect(mockService.deletar).toHaveBeenCalledWith(placa);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true
            });
        });

        it('deve retornar erro se o serviço lançar exceção', async () => {
            const erro = new Error('Automóvel não encontrado');
            const placa = 'XYZ-9999';
            mockReq.params = { placa };

            (mockService.deletar as jest.Mock) = jest.fn().mockRejectedValueOnce(erro);

            await controller.deletarAutomovel(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                error: 'Automóvel não encontrado'
            });
        });
    });

    describe('buscarPorPlaca', () => {
        it('deve retornar o automóvel se existir', async () => {
            const placa = 'ABC-1234';
            const automovel: Automovel = { placa, marca: 'Fiat Uno', cor: 'azul' };
            mockReq.params = { placa };

            // Mock do service
            (mockService.buscarPorPlaca as jest.Mock) = jest.fn().mockResolvedValueOnce(automovel);

            await controller.buscarPorPlaca(mockReq as Request, mockRes as Response);

            expect(mockService.buscarPorPlaca).toHaveBeenCalledWith(placa);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: automovel
            });
        });

        it('deve retornar erro se o automóvel não existir', async () => {
            const placa = 'XYZ-9999';
            const erro = new Error('Automovel não existe');
            mockReq.params = { placa };
            
            (mockService.buscarPorPlaca as jest.Mock) = jest.fn().mockRejectedValueOnce(erro);

            await controller.buscarPorPlaca(mockReq as Request, mockRes as Response);

            expect(mockService.buscarPorPlaca).toHaveBeenCalledWith(placa);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                error: 'Automovel não existe'
            });
        });
    });

    describe('listarPorFiltro', () => {
        it('deve retornar a lista filtrada de automóveis', async () => {
            const filtro: AutomovelFiltroDTO = {
                marca: 'Fiat',
                cor: 'Azul'
            };

            const automoveis: Automovel[] = [
                { placa: 'ABC-1234', marca: 'Fiat', cor: 'Azul' }
            ];

            mockReq.body = filtro;

            (mockService.listarPorFiltro as jest.Mock) = jest.fn().mockResolvedValueOnce(automoveis);

            await controller.listarPorFiltro(mockReq as Request, mockRes as Response);

            expect(mockService.listarPorFiltro).toHaveBeenCalledWith(filtro);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: automoveis
            });
        });

        it('deve retornar erro caso o service lance erro', async () => {
            const filtro: AutomovelFiltroDTO = {
                marca: 'Ford',
                cor: 'Vermelho'
            };

            const erro = new Error('Filtro inválido');

            mockReq.body = filtro;

            (mockService.listarPorFiltro as jest.Mock) = jest
                .fn()
                .mockRejectedValueOnce(erro);

            await controller.listarPorFiltro(mockReq as Request, mockRes as Response);

            expect(mockService.listarPorFiltro).toHaveBeenCalledWith(filtro);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                error: 'Filtro inválido'
            });
        });
    });


});

import { Request, Response } from "express";
import { MotoristaController } from "../../../controller/MotoristaController";
import { MotoristaService } from "../../../service/MotoristaService";

describe('MotoristaController', () => {
    let controller: MotoristaController;
    let mockService: Partial<MotoristaService>;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    describe('criar', () => {

        beforeEach(() => {
            jsonMock = jest.fn();
            statusMock = jest.fn(() => ({ json: jsonMock })) as any;

            mockReq = {
                body: {},
            };

            mockRes = {
                status: statusMock,
            };

            mockService = {
                criarMotorista: jest.fn(),
            };

            controller = new MotoristaController(mockService as MotoristaService);
        });

        it('deve criar um motorista com sucesso', async () => {
            const motorista = { id: 1, nome: 'João Silva' };
            mockReq.body = motorista;

            (mockService.criarMotorista as jest.Mock).mockResolvedValueOnce(motorista);

            await controller.criarMotorista(mockReq as Request, mockRes as Response);

            expect(mockService.criarMotorista).toHaveBeenCalledWith(motorista);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: motorista,
            });
        });

        it('deve retornar erro caso o service lance exceção', async () => {
            const motorista = { id: 1, nome: 'João Silva' };
            const erro = new Error('Dados inválidos');

            mockReq.body = motorista;

            (mockService.criarMotorista as jest.Mock).mockRejectedValueOnce(erro);

            await controller.criarMotorista(mockReq as Request, mockRes as Response);

            expect(mockService.criarMotorista).toHaveBeenCalledWith(motorista);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                erro: 'Dados inválidos',
            });
        });

    });

    describe('atualizarMotorista', () => {

        beforeEach(() => {
            jsonMock = jest.fn();
            statusMock = jest.fn(() => ({ json: jsonMock })) as any;

            mockReq = {
                params: {},
                body: {},
            };

            mockRes = {
                status: statusMock,
            };

            mockService = {
                atualizarMotorista: jest.fn(),
            };

            controller = new MotoristaController(mockService as MotoristaService);
        });

        it('deve atualizar um motorista com sucesso', async () => {
            const id = 1;
            const motoristaAtualizado = { id, nome: "João Atualizado" };

            mockReq.params = { id: String(id) };
            mockReq.body = { nome: "João Atualizado" };

            (mockService.atualizarMotorista as jest.Mock)
                .mockResolvedValueOnce(motoristaAtualizado);

            await controller.atualizarMotorista(mockReq as Request, mockRes as Response);

            expect(mockService.atualizarMotorista)
                .toHaveBeenCalledWith(id, { nome: "João Atualizado" });

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: motoristaAtualizado
            });
        });

        it('deve retornar erro caso o service lance exceção', async () => {
            const id = 1;
            const erro = new Error("Dados inválidos");

            mockReq.params = { id: String(id) };
            mockReq.body = { nome: "" };

            (mockService.atualizarMotorista as jest.Mock)
                .mockRejectedValueOnce(erro);

            await controller.atualizarMotorista(mockReq as Request, mockRes as Response);

            expect(mockService.atualizarMotorista)
                .toHaveBeenCalledWith(id, { nome: "" });

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                erro: "Dados inválidos"
            });
        });

    });


})
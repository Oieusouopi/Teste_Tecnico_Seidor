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


})
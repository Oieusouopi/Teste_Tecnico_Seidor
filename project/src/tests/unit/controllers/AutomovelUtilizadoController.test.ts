import { AutomovelUtilizadoController } from "../../../controller/AutomovelUtilizadoController";
import { AutomovelUtilizado } from "../../../models/AutomovelUtilizado";
import { AutomovelUtilizadoService } from "../../../service/AutomovelUtilizadoService";
import { Request, Response } from "express";

describe("AutomovelUtilizadoController", () => {
    let controller: AutomovelUtilizadoController;
    let service: jest.Mocked<AutomovelUtilizadoService>;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        service = {
            utilizarAutomovel: jest.fn(),
            finalizarUtilizacaoPor: jest.fn(),
            listar: jest.fn(),
        } as unknown as jest.Mocked<AutomovelUtilizadoService>;

        controller = new AutomovelUtilizadoController(service);

        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        req = {};
        res = {
            status: statusMock,
        } as unknown as Response;
    });

    // ------------------------------------------------------------
    // TESTE: criarAutomovelUtilizado
    // ------------------------------------------------------------
    describe("criarAutomovelUtilizado", () => {
        it("deve criar um automóvel utilizado com sucesso", async () => {
            const body = {
                id: null,
                dataInicioUtilizacao: new Date(),
                motivoUtilizacao: "Entrega",
                motoristaId: 1,
                automovelPlaca: "AAA-1111",
            };

            const retornoService: AutomovelUtilizado = {
                id: 10,
                dataInicioUtilizacao: body.dataInicioUtilizacao,
                dataFinalUtilizacao: null,
                motivoUtilizacao: "Entrega",
                motorista: { id: 1, nome: "João" },
                automovel: { placa: "AAA-1111", marca: "Fiat", cor: "Azul" }
            };

            req.body = body;
            service.utilizarAutomovel.mockResolvedValue(retornoService);

            await controller.criarAutomovelUtilizado(req as Request, res as Response);

            expect(service.utilizarAutomovel).toHaveBeenCalledWith(body);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: retornoService
            });
        });

        it("deve retornar erro caso o service lance exceção", async () => {
            const body = { id: null } as any;

            req.body = body;
            service.utilizarAutomovel.mockRejectedValue(new Error("Erro no service"));

            await controller.criarAutomovelUtilizado(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                erro: "Erro no service"
            });
        });
    });

    // ------------------------------------------------------------
    // TESTE: finalizarUtilizacaoPor
    // ------------------------------------------------------------
    describe("finalizarUtilizacaoPor", () => {
        it("deve finalizar a utilização com sucesso", async () => {
            req.params = { motoristaId: "5" };

            service.finalizarUtilizacaoPor.mockResolvedValue();

            await controller.finalizarUtilizacaoPor(req as Request, res as Response);

            expect(service.finalizarUtilizacaoPor).toHaveBeenCalledWith(5);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
            });
        });

        it("deve retornar erro caso o service lance exceção", async () => {
            req.params = { motoristaId: "7" };

            service.finalizarUtilizacaoPor.mockRejectedValue(new Error("Motorista não encontrado"));

            await controller.finalizarUtilizacaoPor(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                erro: "Motorista não encontrado"
            });
        });
    });

    // ------------------------------------------------------------
    // TESTE: listar
    // ------------------------------------------------------------
    describe("listar", () => {
        it("deve listar automóveis utilizados", async () => {
            const lista: AutomovelUtilizado[] = [
                {
                    id: 1,
                    dataInicioUtilizacao: new Date(),
                    dataFinalUtilizacao: null,
                    motivoUtilizacao: "Entrega",
                    motorista: { id: 1, nome: "João" },
                    automovel: { placa: "AAA-1111", marca: "Fiat", cor: "Azul" }
                }
            ];

            service.listar.mockResolvedValue(lista);

            await controller.listar(req as Request, res as Response);

            expect(service.listar).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: true,
                dados: lista
            });
        });

        it("deve retornar erro caso o service lance exceção", async () => {
            service.listar.mockRejectedValue(new Error("Erro ao listar"));

            await controller.listar(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                sucesso: false,
                erro: "Erro ao listar"
            });
        });
    });

});

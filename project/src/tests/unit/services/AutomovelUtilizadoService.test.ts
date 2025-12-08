import { IAutomovelUtilizadoRepository } from "../../../repositories/automovel_utilizado/IAutomovelUtilizadoRepository";
import { AutomovelService } from "../../../service/AutomovelService";
import { MotoristaService } from "../../../service/MotoristaService";
import { AutomovelUtilizadoService } from "../../../service/AutomovelUtilizadoService";
import { Motorista } from "../../../models/Motorista";
import { Automovel } from "../../../models/Automovel";
import { AutomovelUtilizado } from "../../../models/AutomovelUtilizado";
import { AutomovelUtilizadoCriarDTO } from "../../../dto/AutomovelUtilizadoCriarDTO";


describe("AutomovelUtilizadoService", () => {

    let repository: jest.Mocked<IAutomovelUtilizadoRepository>;
    let automovelService: jest.Mocked<AutomovelService>;
    let motoristaService: jest.Mocked<MotoristaService>;
    let service: AutomovelUtilizadoService;

    beforeEach(() => {
        repository = {
            criarAutomovelUtilizado: jest.fn(),
            buscarMotoristaUtilizandoCarroPor: jest.fn(),
            buscarAutomovelUtilizadoPor: jest.fn(),
            finalizarUtilizacaoPor: jest.fn(),
            listar: jest.fn(),
        };

        automovelService = {
            buscarPorPlaca: jest.fn(),
        } as any;

        motoristaService = {
            buscarPorId: jest.fn(),
        } as any;

        service = new AutomovelUtilizadoService(
            repository,
            automovelService,
            motoristaService
        );
    });

    // =====================================================================
    // utilizarAutomovel
    // =====================================================================
    describe("utilizarAutomovel", () => {

        const dtoBase: AutomovelUtilizadoCriarDTO = {
            id: null,
            dataInicioUtilizacao: new Date("2025-01-01T09:00:00"),
            motivoUtilizacao: "Entrega",
            motoristaId: 1,
            automovelPlaca: "ABC-1234",
        };

        it("deve lançar erro se dto for null", async () => {
            await expect(service.utilizarAutomovel(null as any))
                .rejects
                .toThrow("Dados são obrigatórios");
        });

        it("deve lançar erro se dataInicioUtilizacao for inválida", async () => {
            await expect(
                service.utilizarAutomovel({ ...dtoBase, dataInicioUtilizacao: undefined as any })
            ).rejects.toThrow("Data de início da utilização é obrigatória");
        });

        it("deve lançar erro se motoristaId for inválido", async () => {
            await expect(
                service.utilizarAutomovel({ ...dtoBase, motoristaId: 0 })
            ).rejects.toThrow("ID do motorista é obrigatório");
        });

        it("deve lançar erro se placa for vazia", async () => {
            await expect(
                service.utilizarAutomovel({ ...dtoBase, automovelPlaca: "  " })
            ).rejects.toThrow("A placa do automóvel é obrigatória");
        });

        it("deve lançar erro se o motorista já estiver utilizando outro carro", async () => {
            repository.buscarMotoristaUtilizandoCarroPor.mockResolvedValue({} as any);

            await expect(service.utilizarAutomovel(dtoBase))
                .rejects
                .toThrow("Motorista já esta utilizando algum automóvel");
        });

        it("deve lançar erro se o carro já estiver sendo utilizado", async () => {
            repository.buscarMotoristaUtilizandoCarroPor.mockResolvedValue(null);
            repository.buscarAutomovelUtilizadoPor.mockResolvedValue({} as any);

            await expect(service.utilizarAutomovel(dtoBase))
                .rejects
                .toThrow("Automóvel já esta sendo utilizado");
        });

        it("deve criar um automóvel utilizado (fluxo feliz)", async () => {

            repository.buscarMotoristaUtilizandoCarroPor.mockResolvedValue(null);
            repository.buscarAutomovelUtilizadoPor.mockResolvedValue(null);

            const motorista: Motorista = { id: 1, nome: "João" };
            const automovel: Automovel = { placa: "ABC-1234", cor: "Azul", marca: "Fiat" };

            motoristaService.buscarPorId.mockResolvedValue(motorista);
            automovelService.buscarPorPlaca.mockResolvedValue(automovel);

            const criado: AutomovelUtilizado = {
                id: 1,
                dataInicioUtilizacao: new Date(dtoBase.dataInicioUtilizacao),
                dataFinalUtilizacao: null,
                motivoUtilizacao: dtoBase.motivoUtilizacao,
                motorista,
                automovel
            };

            repository.criarAutomovelUtilizado.mockResolvedValue(criado);

            const resultado = await service.utilizarAutomovel(dtoBase);

            expect(repository.buscarMotoristaUtilizandoCarroPor).toHaveBeenCalledWith(1);
            expect(repository.buscarAutomovelUtilizadoPor).toHaveBeenCalledWith("ABC-1234");
            expect(motoristaService.buscarPorId).toHaveBeenCalledWith(1);
            expect(automovelService.buscarPorPlaca).toHaveBeenCalledWith("ABC-1234");
            expect(repository.criarAutomovelUtilizado).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(criado);
        });

    });

    // =====================================================================
    // finalizarUtilizacaoPor
    // =====================================================================
    describe("finalizarUtilizacaoPor", () => {

        it("deve lançar erro se o motorista não estiver utilizando automóvel", async () => {
            repository.buscarMotoristaUtilizandoCarroPor.mockResolvedValue(null);

            await expect(service.finalizarUtilizacaoPor(1))
                .rejects
                .toThrow("Motorista não esta utilizando algum automóvel");
        });

        it("deve finalizar a utilização corretamente", async () => {
            repository.buscarMotoristaUtilizandoCarroPor.mockResolvedValue({} as any);

            await service.finalizarUtilizacaoPor(1);

            expect(repository.finalizarUtilizacaoPor).toHaveBeenCalledWith(1);
        });

    });

    // =====================================================================
    // listar
    // =====================================================================
    describe("listar", () => {

        it("deve retornar lista do repositório", async () => {
            const listaMock: AutomovelUtilizado[] = [
                { id: 1 } as any,
                { id: 2 } as any,
            ];

            repository.listar.mockResolvedValue(listaMock);

            const resultado = await service.listar();

            expect(repository.listar).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(listaMock);
        });

    });

});

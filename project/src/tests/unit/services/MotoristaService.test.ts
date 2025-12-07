import { IMotoristaRepository } from "../../../repositories/motorista/IMotoristaRepository";
import { MotoristaService } from "../../../service/MotoristaService";

const mockRepository: jest.Mocked<IMotoristaRepository> = {
    criar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    listarPorFiltro: jest.fn(),
};

describe('MotoristaService', () => {
    let service: MotoristaService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new MotoristaService(mockRepository);
    });

    describe('criar', () => {

        it('deve criar um motorista com sucesso', async () => {
            const motorista = { id: 1, nome: 'João Silva' };

            mockRepository.criar.mockResolvedValueOnce(motorista);

            const resultado = await service.criarMotorista(motorista);

            expect(mockRepository.criar).toHaveBeenCalledWith(motorista);
            expect(resultado).toEqual(motorista);
        });

        it('deve lançar erro se motorista for nulo', async () => {
            await expect(service.criarMotorista(null as any))
                .rejects
                .toThrow('Dados do motorista são obrigatórios');

            expect(mockRepository.criar).not.toHaveBeenCalled();
        });

        it('deve lançar erro se motorista for undefined', async () => {
            await expect(service.criarMotorista(undefined as any))
                .rejects
                .toThrow('Dados do motorista são obrigatórios');

            expect(mockRepository.criar).not.toHaveBeenCalled();
        });

    });

    describe('atualizarMotorista', () => {

        it('deve atualizar um motorista com sucesso', async () => {
            const id = 1;

            const motoristaAtualizar = { nome: 'João Atualizado' };
            const motoristaAtualizado = { id: 1, nome: 'João Atualizado' };

            mockRepository.atualizar = jest.fn().mockResolvedValueOnce(motoristaAtualizado);

            const resultado = await service.atualizarMotorista(id, motoristaAtualizar);

            expect(mockRepository.atualizar).toHaveBeenCalledWith(id, motoristaAtualizar);
            expect(resultado).toEqual(motoristaAtualizado);
        });

        it('deve lançar erro se motorista for nulo', async () => {
            await expect(service.atualizarMotorista(1, null as any))
                .rejects
                .toThrow('Dados do motorista são obrigatorios');

            expect(mockRepository.atualizar).not.toHaveBeenCalled();
        });

        it('deve lançar erro se motorista for undefined', async () => {
            await expect(service.atualizarMotorista(1, undefined as any))
                .rejects
                .toThrow('Dados do motorista são obrigatorios');

            expect(mockRepository.atualizar).not.toHaveBeenCalled();
        });

    });

    describe('deletar', () => {

        it('deve chamar o repositório para deletar o motorista', async () => {
            const id = 1;

            mockRepository.deletar.mockResolvedValueOnce();

            await service.deletar(id);

            expect(mockRepository.deletar).toHaveBeenCalledWith(id);
        });

        it('deve aceitar id undefined e repassar ao repositório', async () => {
            mockRepository.deletar.mockResolvedValueOnce();

            await service.deletar(undefined as any);

            expect(mockRepository.deletar).toHaveBeenCalledWith(undefined);
        });

        it('deve aceitar id null e repassar ao repositório', async () => {
            mockRepository.deletar.mockResolvedValueOnce();

            await service.deletar(null as any);

            expect(mockRepository.deletar).toHaveBeenCalledWith(null);
        });

    });

    describe('buscarPorId', () => {

        it('deve retornar o motorista quando o id existir', async () => {
            const motorista = { id: 1, nome: 'Rafael' };

            mockRepository.buscarPorId = jest.fn().mockResolvedValueOnce(motorista);

            const resultado = await service.buscarPorId(1);

            expect(mockRepository.buscarPorId).toHaveBeenCalledWith(1);
            expect(resultado).toEqual(motorista);
        });

        it('deve lançar erro quando o motorista não existir', async () => {
            mockRepository.buscarPorId = jest.fn().mockResolvedValueOnce(null);

            await expect(service.buscarPorId(999))
                .rejects
                .toThrow('Motorista não existe');

            expect(mockRepository.buscarPorId).toHaveBeenCalledWith(999);
        });

        it('deve lançar erro quando o repositório retornar undefined', async () => {
            mockRepository.buscarPorId = jest.fn().mockResolvedValueOnce(undefined);

            await expect(service.buscarPorId(5))
                .rejects
                .toThrow('Motorista não existe');

            expect(mockRepository.buscarPorId).toHaveBeenCalledWith(5);
        });

    });

    describe('listarPorFiltro', () => {

        it('deve chamar o repository com o nome tratado (trim)', async () => {
            mockRepository.listarPorFiltro.mockResolvedValueOnce([]);

            await service.listarPorFiltro({ nome: "  Rafael  " });

            expect(mockRepository.listarPorFiltro).toHaveBeenCalledWith({
                nome: "Rafael"
            });
        });

        it('deve transformar string vazia em null', async () => {
            mockRepository.listarPorFiltro.mockResolvedValueOnce([]);

            await service.listarPorFiltro({ nome: "" });

            expect(mockRepository.listarPorFiltro).toHaveBeenCalledWith({
                nome: null
            });
        });

        it('deve transformar nome undefined em null', async () => {
            mockRepository.listarPorFiltro.mockResolvedValueOnce([]);

            await service.listarPorFiltro({ nome: undefined as any });

            expect(mockRepository.listarPorFiltro).toHaveBeenCalledWith({
                nome: null
            });
        });

        it('deve retornar a lista enviada pelo repository', async () => {
            const listaMock = [
                { id: 1, nome: 'Rafael' }
            ];

            mockRepository.listarPorFiltro.mockResolvedValueOnce(listaMock);

            const resultado = await service.listarPorFiltro({ nome: "Rafael" });

            expect(resultado).toEqual(listaMock);
        });

    });


});
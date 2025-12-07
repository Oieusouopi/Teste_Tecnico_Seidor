import { IMotoristaRepository } from "../../../repositories/motorista/IMotoristaRepository";
import { MotoristaService } from "../../../service/MotoristaService";

const mockRepository: jest.Mocked<IMotoristaRepository> = {
    criar: jest.fn(),
    atualizar: jest.fn(),
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



});
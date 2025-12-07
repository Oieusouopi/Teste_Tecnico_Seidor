import { IMotoristaRepository } from "../../../repositories/motorista/IMotoristaRepository";
import { MotoristaService } from "../../../service/MotoristaService";

const mockRepository: jest.Mocked<IMotoristaRepository> = {
    criar: jest.fn(),
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


});
import { AutomovelService } from "../../../service/AutomovelService";
import { Automovel } from "../../../models/Automovel";
import { IAutomovelRepository } from "../../../repositories/automovel/IAutomovelRepository";

const mockRepository: jest.Mocked<IAutomovelRepository> = {
    criar: jest.fn(),
    buscarPorPlaca: jest.fn(),
    listar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
};

describe('AutomovelService', () => {
    let service: AutomovelService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new AutomovelService(mockRepository);
    });

    describe('criar', () => {
        it('deve criar um automóvel com sucesso', async () => {
            const automovel: Automovel = { placa: 'ABC-1234', marca: 'Fiat Uno', cor: "azul" };
    
            mockRepository.buscarPorPlaca.mockResolvedValueOnce(null);
            mockRepository.criar.mockResolvedValueOnce(automovel);
    
            const result = await service.criarAutomovel(automovel);
    
            expect(mockRepository.buscarPorPlaca).toHaveBeenCalledWith('ABC-1234');
            expect(mockRepository.criar).toHaveBeenCalledWith(automovel);
            expect(result).toEqual(automovel);
        });
    
        it('deve lançar erro se automóvel não for fornecido', async () => {
            await expect(service.criarAutomovel(null as any))
                .rejects
                .toThrow('Dados do automóvel são obrigatórios');
        });
    
        it('deve lançar erro se automóvel não tiver placa', async () => {
            const automovel: Automovel = { placa: '', marca: 'Fiat Uno', cor: 'azul' };
            await expect(service.criarAutomovel(automovel))
                .rejects
                .toThrow('Automóvel sem placa');
        });
    
        it('deve lançar erro se automóvel já existir', async () => {
            const automovel: Automovel = { placa: 'ABC-1234', marca: 'Fiat Uno', cor: 'azul' };
            mockRepository.buscarPorPlaca.mockResolvedValueOnce(automovel);
    
            await expect(service.criarAutomovel(automovel))
                .rejects
                .toThrow('Automóvel já existe');
        });

    });

    describe('atualizar', () => {
        it('deve atualizar um automóvel com sucesso', async () => {
            const automovel: Automovel = { placa: 'ABC-1234', marca: 'Fiat Palio', cor: 'verde' };
            
            mockRepository.buscarPorPlaca.mockResolvedValueOnce(automovel);
            mockRepository.atualizar.mockResolvedValueOnce(automovel);

            const result = await service.atualizar(automovel);

            expect(mockRepository.buscarPorPlaca).toHaveBeenCalledWith('ABC-1234');
            expect(mockRepository.atualizar).toHaveBeenCalledWith({
                placa: 'ABC-1234',
                marca: 'Fiat Palio',
                cor: 'verde'
            });
            expect(result).toEqual(automovel);
            
        });

        it('deve lançar erro se automóvel não for fornecido', async () => {
            await expect(service.atualizar(null as any))
                .rejects
                .toThrow('Dados do automóvel são obrigatórios');
        });

        it('deve lançar erro se automóvel não tiver placa', async () => {
            const automovel: Automovel = { placa: '', marca: 'Fiat Palio', cor: 'verde' };
            await expect(service.atualizar(automovel))
                .rejects
                .toThrow('Automovel sem placa');
        });

        it('deve lançar erro se automóvel não existir', async () => {
            const automovel: Automovel = { placa: 'ABC-1234', marca: 'Fiat Palio', cor: 'verde' };
            mockRepository.buscarPorPlaca.mockResolvedValueOnce(null);

            await expect(service.atualizar(automovel))
                .rejects
                .toThrow('Automovel não existe');
        });
    });

    describe('deletar', () => {
        it('deve deletar um automóvel existente', async () => {
            const placa = 'ABC-1234';
            
            mockRepository.deletar.mockResolvedValueOnce();

            await expect(service.deletar(placa)).resolves.not.toThrow();
            expect(mockRepository.deletar).toHaveBeenCalledWith(placa);
        });

        it('não deve falhar se a placa não existir', async () => {
            const placa = 'XYZ-9999';
            
            mockRepository.deletar.mockResolvedValueOnce();

            await expect(service.deletar(placa)).resolves.not.toThrow();
            expect(mockRepository.deletar).toHaveBeenCalledWith(placa);
        });
    });

});
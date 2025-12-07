import { AutomovelService } from "../../../service/AutomovelService";
import { Automovel } from "../../../models/Automovel";
import { IAutomovelRepository } from "../../../repositories/automovel/IAutomovelRepository";

const mockRepository: jest.Mocked<IAutomovelRepository> = {
    criar: jest.fn(),
    buscarPorPlaca: jest.fn(),
    listar: jest.fn()
};

describe('AutomovelService', () => {
    let service: AutomovelService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new AutomovelService(mockRepository);
    });

    it('deve criar um automóvel com sucesso', async () => {
        const automovel: Automovel = { placa: 'ABC-1234', marca: 'Fiat Uno', cor: "azul" };

        // Agora funciona
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
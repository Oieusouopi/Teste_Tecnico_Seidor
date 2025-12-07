import { AutomovelService } from "../../../service/AutomovelService";
import { Automovel } from "../../../models/Automovel";
import { IAutomovelRepository } from "../../../repositories/automovel/IAutomovelRepository";
import { AutomovelAtualizarDTO } from "../../../dto/AutomovelAtualizarDTO";

const mockRepository: jest.Mocked<IAutomovelRepository> = {
    criar: jest.fn(),
    buscarPorPlaca: jest.fn(),
    listar: jest.fn(),
    listarPorFiltos: jest.fn(),
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
            const automovel: AutomovelAtualizarDTO = { marca: 'Fiat Palio', cor: 'verde' };
            const automovelEntidade: Automovel = { placa: 'ABC-1234',  marca: 'Fiat Palio', cor: 'verde' };
            const placa = 'ABC-1234';
            
            mockRepository.buscarPorPlaca.mockResolvedValueOnce(automovelEntidade);
            mockRepository.atualizar.mockResolvedValueOnce(automovelEntidade);

            const result = await service.atualizar(placa, automovel);

            expect(mockRepository.buscarPorPlaca).toHaveBeenCalledWith('ABC-1234');
            expect(mockRepository.atualizar).toHaveBeenCalledWith('ABC-1234', {
                marca: 'Fiat Palio',
                cor: 'verde'
            });
            expect(result.cor).toEqual(automovel.cor);
            expect(result.marca).toEqual(automovel.marca);
            
        });

        it('deve lançar erro se automóvel não for fornecido', async () => {
            await expect(service.atualizar('', null as any))
                .rejects
                .toThrow('Dados do automóvel são obrigatórios');
        });

        it('deve lançar erro se automóvel não tiver placa', async () => {
            const automovel: AutomovelAtualizarDTO = { marca: 'Fiat Palio', cor: 'verde' };
            await expect(service.atualizar('', automovel))
                .rejects
                .toThrow('Automovel sem placa');
        });

        it('deve lançar erro se automóvel não existir', async () => {
            const automovel: AutomovelAtualizarDTO = { marca: 'Fiat Palio', cor: 'verde' };
            const placa: string = 'ABC-1234';
            mockRepository.buscarPorPlaca.mockResolvedValueOnce(null);

            await expect(service.atualizar(placa, automovel))
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

    describe('buscarPorPlaca', () => {
        it('deve retornar o automóvel se existir', async () => {
            const placa = 'ABC-1234';
            const automovel: Automovel = { placa, marca: 'Fiat Uno', cor: 'azul' };

            mockRepository.buscarPorPlaca.mockResolvedValueOnce(automovel);

            await expect(service.buscarPorPlaca(placa)).resolves.toEqual(automovel);
            expect(mockRepository.buscarPorPlaca).toHaveBeenCalledWith(placa);
        });

        it('deve lançar erro se o automóvel não existir', async () => {
            const placa = 'XYZ-9999';

            mockRepository.buscarPorPlaca.mockResolvedValueOnce(null);

            await expect(service.buscarPorPlaca(placa)).rejects.toThrow('Automovel não existe');
            expect(mockRepository.buscarPorPlaca).toHaveBeenCalledWith(placa);
        });
    });

    describe('listarPorFiltro', () => {
    beforeEach(() => {
        mockRepository.listarPorFiltos = jest.fn();
    });

    it('deve retornar todos os automóveis se não houver filtros', async () => {
        const automoveis: Automovel[] = [
            { placa: 'ABC-1234', marca: 'Fiat', cor: 'Azul' },
            { placa: 'DEF-5678', marca: 'Ford', cor: 'Vermelho' }
        ];

        mockRepository.listarPorFiltos.mockResolvedValueOnce(automoveis);

        const resultado = await service.listarPorFiltro({marca: null, cor: null});

        expect(mockRepository.listarPorFiltos).toHaveBeenCalledWith({ cor: null, marca: null });
        expect(resultado).toEqual(automoveis);
    });

    it('deve filtrar por cor', async () => {
        const automoveis: Automovel[] = [
            { placa: 'ABC-1234', marca: 'Fiat', cor: 'Azul' }
        ];

        mockRepository.listarPorFiltos.mockResolvedValueOnce(automoveis);

        const resultado = await service.listarPorFiltro({ cor: 'Azul', marca: '' });

        expect(mockRepository.listarPorFiltos).toHaveBeenCalledWith({ cor: 'Azul', marca: null });
        expect(resultado).toEqual(automoveis);
    });

    it('deve filtrar por marca', async () => {
        const automoveis: Automovel[] = [
            { placa: 'DEF-5678', marca: 'Ford', cor: 'Vermelho' }
        ];

        mockRepository.listarPorFiltos.mockResolvedValueOnce(automoveis);

        const resultado = await service.listarPorFiltro({ cor: '', marca: 'Ford' });

        expect(mockRepository.listarPorFiltos).toHaveBeenCalledWith({ cor: null, marca: 'Ford' });
        expect(resultado).toEqual(automoveis);
    });

    it('deve filtrar por marca e cor', async () => {
        const automoveis: Automovel[] = [
            { placa: 'ABC-1234', marca: 'Fiat', cor: 'Azul' }
        ];

        mockRepository.listarPorFiltos.mockResolvedValueOnce(automoveis);

        const resultado = await service.listarPorFiltro({ cor: 'Azul', marca: 'Fiat' });

        expect(mockRepository.listarPorFiltos).toHaveBeenCalledWith({ cor: 'Azul', marca: 'Fiat' });
        expect(resultado).toEqual(automoveis);
    });

    it('deve retornar vazio se nenhum automóvel corresponder', async () => {
        mockRepository.listarPorFiltos.mockResolvedValueOnce([]);

        const resultado = await service.listarPorFiltro({ cor: 'Preto', marca: 'Chevrolet' });

        expect(mockRepository.listarPorFiltos).toHaveBeenCalledWith({ cor: 'Preto', marca: 'Chevrolet' });
        expect(resultado).toEqual([]);
    });
    });


});
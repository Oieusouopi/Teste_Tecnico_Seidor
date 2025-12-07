import { AutomovelRepositoryMemory } from '../../../repositories/automovel/AutomovelRepositoryMemory';
import { Automovel } from '../../../models/Automovel';

describe('AutomovelRepositoryMemory', () => {
    let repository: AutomovelRepositoryMemory;

    beforeEach(() => {
        repository = new AutomovelRepositoryMemory();
    });

    describe('criar', () => {
        it('deve criar um automóvel com sucesso', async () => {
            const automovel: Automovel = {
                marca: 'Fiat',
                placa: 'ABC-1234',
                cor: 'Azul',
            };

            const resultado = await repository.criar(automovel);

            expect(resultado).toEqual(automovel);
        });
    });

    describe('buscarPorPlaca', () => {
        it('deve retornar o automóvel quando a placa existe', async () => {
            const automovel: Automovel = {
                marca: 'Fiat',
                placa: 'ABC-1234',
                cor: 'azul',
            };

            await repository.criar(automovel);
            const resultado = await repository.buscarPorPlaca('ABC-1234');

            expect(resultado).toEqual(automovel);
        });

        it('deve retornar null quando a placa não existe', async () => {
            const resultado = await repository.buscarPorPlaca('XYZ-9999');
            expect(resultado).toBeNull();
        });
    });

    describe('atualizar', () => {
        it('deve atualizar o automóvel', async () => {
            const automovel: Automovel = {
                marca: 'Fiat',
                placa: 'ABC-1234',
                cor: 'Azul',
            };

            await repository.criar(automovel);

            const automovelAtualizado: Automovel = {
                marca: 'Fiat',
                placa: 'ABC-1234',
                cor: 'Vermelho',
            };

            const resultado = await repository.atualizar(automovelAtualizado);

            expect(resultado).toEqual(automovelAtualizado);

            const doRepositorio = await repository.buscarPorPlaca('ABC-1234');
            expect(doRepositorio).toEqual(automovelAtualizado);
        });
    });

});
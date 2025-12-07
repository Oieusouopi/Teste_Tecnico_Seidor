import { Motorista } from '../../../models/Motorista';
import { MotoristaRepositoryMemory } from '../../../repositories/motorista/MotoristaRepositoryMemory';

describe('MotoristaRepositoryMemory', () => {
    let repository: MotoristaRepositoryMemory

    beforeEach(() => {
        repository = new MotoristaRepositoryMemory();
    })

    describe('criar', () => {
          it('deve criar um motorista com sucesso', async () => {
            const motorista: Motorista = {
                id: null,
                nome: "Rafael"
            };

            const resultado = await repository.criar(motorista);

            expect(resultado).toEqual(motorista);
        });
    });

    describe('atualizar', () => {
        it('deve atualizar um motorista com sucesso', async () => {
            const motoristaOriginal: Motorista = {
                id: 1,
                nome: "João"
            };

            await repository.criar(motoristaOriginal);

            const motoristaAtualizado = {
                nome: "João da Silva"
            };

            const resultado = await repository.atualizar(1, motoristaAtualizado);

            expect(resultado).toEqual({
                id: 1,
                nome: "João da Silva"
            });
        });
    });

    describe('deletar', () => {
        it('deve deletar um motorista pelo id', async () => {
            const motorista1: Motorista = { id: 1, nome: "Rafael" };
            const motorista2: Motorista = { id: 2, nome: "João" };

            await repository.criar(motorista1);
            await repository.criar(motorista2);

            await repository.deletar(1);

            const lista = await repository.listar();
            expect(lista).toEqual([motorista2]);
        });
    });

    describe('buscarPorId', () => {

        it('deve retornar o motorista correspondente ao id', async () => {
            const motorista1: Motorista = { id: 1, nome: "Rafael" };
            const motorista2: Motorista = { id: 2, nome: "João" };

            await repository.criar(motorista1);
            await repository.criar(motorista2);

            const resultado = await repository.buscarPorId(2);

            expect(resultado).toEqual(motorista2);
        });

        it('deve retornar null se o motorista não existir', async () => {
            const motorista1: Motorista = { id: 1, nome: "Rafael" };

            await repository.criar(motorista1);

            const resultado = await repository.buscarPorId(999); // id inexistente

            expect(resultado).toBeNull();
        });

    });

   describe('listarPorFiltro', () => {

        it('deve retornar todos os motoristas quando nenhum filtro for aplicado', async () => {
            const motorista1: Motorista = { id: 1, nome: "Rafael" };
            const motorista2: Motorista = { id: 2, nome: "João" };
            const motorista3: Motorista = { id: 3, nome: "Maria" };

            await repository.criar(motorista1);
            await repository.criar(motorista2);
            await repository.criar(motorista3);

            const resultado = await repository.listarPorFiltro({ nome: null});

            expect(resultado).toEqual([motorista1, motorista2, motorista3]);
        });

        it('deve filtrar corretamente por nome', async () => {
            const motorista1: Motorista = { id: 1, nome: "Rafael" };
            const motorista2: Motorista = { id: 2, nome: "João" };
            const motorista3: Motorista = { id: 3, nome: "Rafael" };

            await repository.criar(motorista1);
            await repository.criar(motorista2);
            await repository.criar(motorista3);

            const resultado = await repository.listarPorFiltro({ nome: "Rafael" });

            expect(resultado).toEqual([motorista1, motorista3]);
        });

        it('deve retornar lista vazia quando nenhum motorista corresponder ao filtro', async () => {
            const motorista1: Motorista = { id: 1, nome: "Rafael" };
            const motorista2: Motorista = { id: 2, nome: "João" };

            await repository.criar(motorista1);
            await repository.criar(motorista2);

            const resultado = await repository.listarPorFiltro({ nome: "Maria" });

            expect(resultado).toEqual([]);
        });

    });

});
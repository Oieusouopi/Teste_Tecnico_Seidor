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


});
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

});
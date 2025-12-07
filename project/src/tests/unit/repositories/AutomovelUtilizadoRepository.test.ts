import { AutomovelUtilizado } from '../../../models/AutomovelUtilizado';
import { AutomovelUtilizadoRepositoryMemory } from '../../../repositories/automovel_utilizado/AutomovelUtilizadoRepositoryMemory';

describe('AutomovelUtilizadoRepository', () => {

    let repository: AutomovelUtilizadoRepositoryMemory;

    beforeEach(() => {
        repository = new AutomovelUtilizadoRepositoryMemory();
    });

    describe('criarAutomovelUtilizado', () => {

        it('deve criar um automóvel utilizado corretamente', async () => {

            const automovelUtilizado: AutomovelUtilizado = {
                id: 1,
                dataInicioUtilizacao: new Date('2025-01-01T09:00:00'),
                dataFinalUtilizacao: new Date('2025-01-01T12:00:00'),
                motivoUtilizacao: 'Entrega de produtos',
                motorista: {
                    id: 1,
                    nome: 'João Silva'
                },
                automovel: {
                    placa: 'ABC-1234',
                    cor: 'Azul',
                    marca: 'Fiat'
                }
            };

            const resultado = await repository.criarAutomovelUtilizado(automovelUtilizado);

            expect(resultado).toEqual(automovelUtilizado);
            expect(repository.automoveisUtilizados.length).toBe(1);
            expect(repository.automoveisUtilizados[0]).toEqual(automovelUtilizado);
        });

    });

});
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

            const lista = await repository.listar();

            expect(lista.length).toBe(1);
            expect(lista[0]).toEqual(automovelUtilizado);
        });

    });

    describe('buscarMotoristaUtilizandoCarroPor', () => {

        it('deve retornar o automóvel que o motorista está usando (sem dataFinal)', async () => {

            const ativo: AutomovelUtilizado = {
                id: 0,
                dataInicioUtilizacao: new Date(),
                dataFinalUtilizacao: null,
                motivoUtilizacao: 'Teste',
                motorista: { id: 10, nome: 'Rafael' },
                automovel: { placa: 'XYZ-9999', cor: 'Preto', marca: 'Ford' },
            };

            await repository.criarAutomovelUtilizado(ativo);

            const encontrado = await repository.buscarMotoristaUtilizandoCarroPor(10);

            expect(encontrado).not.toBeNull();
            expect(encontrado?.motorista.id).toBe(10);
        });

        it('deve retornar null se motorista já finalizou o uso', async () => {

            const item = await repository.criarAutomovelUtilizado({
                id: 0,
                dataInicioUtilizacao: new Date(),
                dataFinalUtilizacao: new Date(), // já finalizado
                motivoUtilizacao: 'Teste',
                motorista: { id: 5, nome: 'Maria' },
                automovel: { placa: 'TTT-0000', cor: 'Prata', marca: 'VW' },
            });

            const encontrado = await repository.buscarMotoristaUtilizandoCarroPor(5);

            expect(encontrado).toBeNull();
        });

    });

    describe('buscarAutomovelUtilizadoPor', () => {

        it('deve retornar automóvel sendo utilizado pela placa', async () => {
            const ativo = await repository.criarAutomovelUtilizado({
                id: 0,
                dataInicioUtilizacao: new Date(),
                dataFinalUtilizacao: null,
                motivoUtilizacao: 'Serviço',
                motorista: { id: 7, nome: 'Carlos' },
                automovel: { placa: 'AAA-1111', cor: 'Vermelho', marca: 'Honda' },
            });

            const encontrado = await repository.buscarAutomovelUtilizadoPor('AAA-1111');

            expect(encontrado).not.toBeNull();
            expect(encontrado?.automovel.placa).toBe('AAA-1111');
        });

        it('deve retornar null se automóvel não está em uso', async () => {
            await repository.criarAutomovelUtilizado({
                id: 0,
                dataInicioUtilizacao: new Date(),
                dataFinalUtilizacao: new Date(), // finalizado
                motivoUtilizacao: 'Serviço',
                motorista: { id: 3, nome: 'Pedro' },
                automovel: { placa: 'BBB-2222', cor: 'Branco', marca: 'Chevrolet' },
            });

            const encontrado = await repository.buscarAutomovelUtilizadoPor('BBB-2222');

            expect(encontrado).toBeNull();
        });

    });

     describe('finalizarUtilizacaoPor', () => {

        it('deve setar dataFinalUtilizacao corretamente', async () => {

            await repository.criarAutomovelUtilizado({
                id: 0,
                dataInicioUtilizacao: new Date(),
                dataFinalUtilizacao: null,
                motivoUtilizacao: 'Teste',
                motorista: { id: 50, nome: 'Ana' },
                automovel: { placa: 'CCC-3333', cor: 'Cinza', marca: 'Toyota' },
            });

            await repository.finalizarUtilizacaoPor(50);

            const lista = await repository.listar();
            const finalizado = lista[0];

            expect(finalizado.dataFinalUtilizacao).toBeInstanceOf(Date);
        });

    });

    describe('listar', () => {

        it('deve listar todos os registros', async () => {

            await repository.criarAutomovelUtilizado({
                id: 0,
                dataInicioUtilizacao: new Date(),
                dataFinalUtilizacao: null,
                motivoUtilizacao: 'x',
                motorista: { id: 1, nome: 'A' },
                automovel: { placa: 'P1', cor: 'c1', marca: 'm1' },
            });

            await repository.criarAutomovelUtilizado({
                id: 0,
                dataInicioUtilizacao: new Date(),
                dataFinalUtilizacao: null,
                motivoUtilizacao: 'y',
                motorista: { id: 2, nome: 'B' },
                automovel: { placa: 'P2', cor: 'c2', marca: 'm2' },
            });

            const lista = await repository.listar();

            expect(lista.length).toBe(2);
            expect(lista[0].id).toBe(1);
            expect(lista[1].id).toBe(2);
        });

    });



});
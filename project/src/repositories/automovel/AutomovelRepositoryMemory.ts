import { AutomovelAtualizarDTO } from "../../dto/AutomovelAtualizarDTO";
import { AutomovelFiltroDTO } from "../../dto/AutomovelFiltroDTO";
import { Automovel } from "../../models/Automovel";
import { IAutomovelRepository } from "./IAutomovelRepository";

export class AutomovelRepositoryMemory implements IAutomovelRepository {
    private automoveis: Automovel[] = [];

    public async criar(automovel: Automovel): Promise<Automovel> {
        this.automoveis.push(automovel);
        return automovel;
    }

    public async listar(): Promise<Automovel[]> {
        return this.automoveis;
    }

    public async listarPorFiltos(automovelFiltroDTO: AutomovelFiltroDTO): Promise<Automovel[]> {
        const { marca, cor } = automovelFiltroDTO;

        if (!marca && !cor) {
            return this.automoveis;
        }

        return this.automoveis.filter(a => {
            const marcaOK = !marca || a.marca === marca;
            const corOK = !cor || a.cor === cor;

            return marcaOK && corOK;
        });
    }

    public async buscarPorPlaca(placa: string): Promise<Automovel | null> {
        const automovel = this.automoveis.find(a => a.placa == placa);
        return automovel || null;
    }

    public async atualizar(placa: string, automovelAtualizado: AutomovelAtualizarDTO): Promise<Automovel> {
        const index = this.automoveis.findIndex(a => a.placa === placa);

        const automovelExistente: Automovel = this.automoveis[index];
        Object.assign(automovelExistente, automovelAtualizado);
        return automovelExistente
    }

    public async deletar(placa: string): Promise<void> {
        this.automoveis = this.automoveis.filter(a => a.placa != placa);
    }

    public limpar(): void {
        this.automoveis = [];
    }
}
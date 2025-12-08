import { Automovel } from "./Automovel";
import { Motorista } from "./Motorista";

export interface AutomovelUtilizado {
    id: number | null;
    dataInicioUtilizacao: Date;
    dataFinalUtilizacao: Date | null;
    motorista: Motorista;
    automovel: Automovel;
    motivoUtilizacao: string;
}
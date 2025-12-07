import { Automovel } from "./Automovel";
import { Motorista } from "./Motorista";

export interface AutomovelUtilizado {
    id: number;
    dataInicioUtilizacao: Date;
    dataFinalUtilizacao: Date;
    motorista: Motorista;
    automovel: Automovel;
    motivoUtilizacao: string;
}
export interface AutomovelUtilizado {
    id: number;
    dataInicioUtilizacao: Date;
    dataFinalUtilizacao: Date;
    motoristaId: number;
    automovelPlaca: string;
    motivoUtilizacao: string;
}
export interface AutomovelUtilizadoCriarDTO {
    id: number | null;
    dataInicioUtilizacao: Date;
    motoristaId: number;
    automovelPlaca: string;
    motivoUtilizacao: string;
}
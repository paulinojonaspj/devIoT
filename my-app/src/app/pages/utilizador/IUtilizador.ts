export interface IUtilizador {
  id?: number;
  nome?: string;
  telemovel?: string;
  email?: string;
  distrito?: string;
  concelho?: string;
  codigoPostal?: string;
  verificacaoConta?: number;
  operadoraAgua?: string;
  unidadeAgua?: string;
  precoUnitarioAgua?: number;
  pagamentoHabitualAgua?: number;
  descricaoContratoAgua?: string;
  operadoraEnergia?: string;
  unidadeEnergia?: string;
  precoUnitarioEnergia?: number;
  pagamentoHabitualEnergia?: number;
  descricaoContratoEnergia?: string;
  estacao?: string;
  data?: Date;
  hora?: number;
  foto?: string;
}

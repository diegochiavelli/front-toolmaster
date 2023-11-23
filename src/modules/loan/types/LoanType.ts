import { CollaboratorType } from '../../collaborator/types/CollaboratorType';
import { EquipmentType } from '../../equipment/type/EquipmentType';
import { LoanEquipmentType } from './LoanEquipmentType';

export interface LoanType {
  id: number;
  dataSaida: string;
  dataDevolucao: string;
  observacao: string;
  status: string;
  id_usuario: number;
  id_funcionario: number;
  emprestimo?: LoanType;
  item?: LoanEquipmentType[];
  equipamento?: EquipmentType[];
  colaborador?: CollaboratorType;
}

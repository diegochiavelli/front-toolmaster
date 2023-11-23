import { Tag } from 'antd';

interface TagColumnProps {
  category?: number;
  status?: string;
}

const colors: string[] = ['orange', 'red', 'green', 'cyan'];

export const convertStatusToNumber = (status: string): number => {
  switch (status) {
    case 'Pendente':
      return 1;
    case 'Vencido':
      return 2;
    case 'Concluído':
      return 3;
    case 'Cancelado':
      return 4;
    default:
      return 0;
  }
};

export const TagColumn = ({ category, status }: TagColumnProps) => {
  if (!category) {
    return null;
  }
  const currentColor = colors[Number(category) - 1] || colors[0];

  return <Tag color={currentColor}>{status}</Tag>;
};

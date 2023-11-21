/* eslint-disable @typescript-eslint/no-explicit-any */
// import TableAntD, { TableProps } from 'antd/es/table';
import { Table as TableAntD, TableProps } from 'antd';

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  return <TableAntD {...props} />;
}

export default Table;

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import theme from '../../../theme';
interface Data {
  [key: string]: any;
}

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}

interface VirtualizedTableProps {
  columns: ColumnData[];
  data: Data[];
}

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
      sx={{
        boxShadow: 'none',
      border: `1px solid ${theme.palette.grey[400]}`,
      }}
    />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function VirtualizedTable({ columns, data }: VirtualizedTableProps) {
  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width, fontWeight: 'bold'}}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (_index: number, row: Data) => (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );

  return (
    <Paper style={{ height: '100%', width: '100%', boxShadow: 'none' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default VirtualizedTable;

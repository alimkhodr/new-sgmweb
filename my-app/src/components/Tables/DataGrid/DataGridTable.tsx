import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Box } from '@mui/material';

interface DataGridTableProps {
  rows: any[]; // Array de dados para preencher as linhas
  columns: GridColDef[]; // Definição das colunas
}

const DataGridTable: React.FC<DataGridTableProps> = ({ rows, columns }) => {
  return (
    <Box>
      <Paper sx={{ height: 640, width: '100%', boxShadow: 0,}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          disableColumnMenu={false}
          sx={{
            border: 0,
            '.MuiDataGrid-cell': {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              fontSize: '14px',
            },
            // '.MuiDataGrid-columnHeaders': {
            //   backgroundColor: theme.palette.background.paper,
            //   fontSize: '16px',
            // },
            // '.MuiDataGrid-columnHeader': {
            //   backgroundColor: theme.palette.background.paper,
            // },
            // '.MuiDataGrid-footerContainer': {
            //   backgroundColor: '#ffffff00',
            // },
            // '.MuiDataGrid-row:hover': {
            //   backgroundColor: theme.palette.secondary.main, // Cor de fundo ao passar o mouse
            //   color: theme.palette.secondary.contrastText,
            // },
          }}
        />
      </Paper>
    </Box>
  );
};

export default DataGridTable;

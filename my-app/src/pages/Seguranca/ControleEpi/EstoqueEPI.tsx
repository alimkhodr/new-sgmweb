// my-app/src/pages/Seguranca/EntregaEpi/PedidosEPI.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Cancel from '@mui/icons-material/Cancel';
import Cookies from 'js-cookie';
import Alert from '../../../components/Alerts/AlertSnackbar';
import api from '../../../config/axiosConfig';
import DataGridTable from '../../../components/Tables/DataGrid/DataGridTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

interface Data {
    [key: string]: any;
}

interface PedidosProps {
    onRowSelect: (data: Data) => void;
}

const Estoque = ({ onRowSelect }: PedidosProps) => {
    // CONSTANTES
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [rows, setRows] = useState<Data[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<Data | null>(null);
    const token = Cookies.get('token');
    const clear = Cookies.get('clear');

    const CloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        listForm();
    }, [clear]);

    // LISTAR FORMULARIO
    const listForm = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        try {
            const response = await api.get<Data[]>('/auth/controle_epi', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const formattedData = response.data.map((row) => {
                if (row.CEPI_CODIGO != null) {
                    return {
                        id: row.CEPI_ID,
                        ITEM: row.CEPI_CODIGO,
                        DESCRICAO: row.CEPI_DESCRICAO,
                        CONTA: row.CEPI_CONTA,
                        CA: row.CEPI_CA,
                        RUN:
                            <IconButton
                                aria-label="run"
                                onClick={() => onRowSelect({
                                    id: row.CEPI_ID,
                                    ITEM: row.CEPI_CODIGO,
                                    DESCRICAO: row.CEPI_DESCRICAO,
                                    CONTA: row.CEPI_CONTA,
                                    CA: row.CEPI_CA,
                                })}
                            >
                                <PlayCircleIcon />
                            </IconButton>,
                        DELETE:
                            <IconButton aria-label="delete" onClick={() => handleOpenDialog(row)}>
                                <Cancel />
                            </IconButton>,
                    };
                }
                return null;
            }).filter((row) => row !== null);
            Cookies.remove('clear');
            setRows(formattedData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setSnackbarMessage('Ocorreu um erro ao carregar os dados');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };


    const handleOpenDialog = (row: Data) => {
        setRowToDelete(row);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setRowToDelete(null);
    };

    const handleRecusa = async () => {
        if (rowToDelete?.CEPI_ID) {
            try {
                const response = await api.put('/auth/desativa_epi', { id: rowToDelete.CEPI_ID }, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setSnackbarMessage('Item desativado com sucesso!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    handleCloseDialog();
                }
                setRows((prevRows) => prevRows.filter((row) => row?.id !== rowToDelete?.CEPI_ID));
            } catch (error) {
                console.error('Erro ao desativar o item:', error);
                setSnackbarMessage('Erro ao desativar o item');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'ITEM', headerName: 'Item', flex: 1 },
        { field: 'DESCRICAO', headerName: 'Descrição', flex: 1 },
        { field: 'CONTA', headerName: 'Conta', flex: 1 },
        { field: 'CA', headerName: 'C.A', flex: 1 },
        {
            field: 'RUN',
            headerName: '',
            width: 40,
            renderCell: (params: GridRenderCellParams) => params.row.RUN
        },
        {
            field: 'DELETE',
            headerName: '',
            width: 40,
            renderCell: (params: GridRenderCellParams) => params.row.DELETE
        },
    ];


    return (
        <>
            <DataGridTable rows={rows} columns={columns} /> {/* Usando o DataGridComponent */}
            <Alert
                open={snackbarOpen}
                handleClose={CloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />

            {/* Diálogo de Confirmação */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Desativar Item"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja desativar o item {rowToDelete?.CEPI_CODIGO}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Não
                    </Button>
                    <Button onClick={handleRecusa} sx={{ fontWeight: 'bold' }} color="primary" autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Estoque;

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

const Pedidos = ({ onRowSelect }: PedidosProps) => {
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
        listAva();
    }, [clear]);

    // LISTAR FORMULARIO
    const listAva = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        try {
            const response = await api.get<Data[]>('/auth/pedidos_epi', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const formattedData = response.data.map((row) => {
                const data = row.EPI_DATA ? row.EPI_DATA.split('T')[0] : null;
                if (row.EPI_CODIGO != null) {
                    return {
                        id: row.EPI_CODIGO,
                        REGISTRO: row.EPI_REGISTRO_FUN,
                        NOME: row.FUN_NOME,
                        DATA: data,
                        ITEM: row.EPI_ITEM,
                        DESCRICAO: row.EPI_DESCRICAO,
                        QTD: row.EPI_QUANTIDADE,
                        AREA: row.EPI_AREA,
                        TURNO: `${row.EPI_TURNO}° Turno`,
                        RUN:
                            <IconButton
                                aria-label="run"
                                onClick={() => onRowSelect({
                                    ID: row.EPI_CODIGO,
                                    REGISTRO: row.EPI_REGISTRO_FUN,
                                    NOME: row.FUN_NOME,
                                    DATA: data,
                                    ITEM: row.EPI_ITEM,
                                    DESCRICAO: row.EPI_DESCRICAO,
                                    QTD: row.EPI_QUANTIDADE,
                                    CONTA: row.EPI_CONTA,
                                    SUBCONTA: row.EPI_SUB_CONTA,
                                    SECAO: row.EPI_SECAO,
                                    AREA: row.EPI_AREA,
                                    TURNO: row.EPI_TURNO,
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
        if (rowToDelete?.EPI_CODIGO) {
            try {
                const response = await api.put('/auth/recusa_epi', { id: rowToDelete.EPI_CODIGO }, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setSnackbarMessage('Item recusado com sucesso!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    handleCloseDialog();
                }
                setRows((prevRows) => prevRows.filter((row) => row?.id !== rowToDelete?.EPI_CODIGO));
            } catch (error) {
                console.error('Erro ao recusar o item:', error);
                setSnackbarMessage('Erro ao recusar o item');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    const isMobile = window.innerWidth <= 900;
    const columns: GridColDef[] = [
        { field: 'REGISTRO', headerName: 'Registro', width: isMobile ? 140 : undefined, flex: isMobile ? undefined : 1 },
        { field: 'NOME', headerName: 'Nome', width: isMobile ? 140 : undefined, flex: isMobile ? undefined : 1 },
        { field: 'DATA', headerName: 'Data', width: isMobile ? 110 : undefined, flex: isMobile ? undefined : 1 },
        { field: 'ITEM', headerName: 'Item', width: isMobile ? 140 : undefined, flex: isMobile ? undefined : 1 },
        { field: 'DESCRICAO', headerName: 'Descrição', width: isMobile ? 150 : undefined, flex: isMobile ? undefined : 1 },
        { field: 'QTD', headerName: 'Qtd', type: 'number', width: isMobile ? 100 : undefined, flex: isMobile ? undefined : 1 },
        { field: 'AREA', headerName: 'Área', width: isMobile ? 140 : undefined, flex: isMobile ? undefined : 1 },
        { field: 'TURNO', headerName: 'Turno', width: isMobile ? 120 : undefined, flex: isMobile ? undefined : 1 },
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
                <DialogTitle>{"Recusar pedido"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja recusar o item {rowToDelete?.EPI_ITEM}?
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

export default Pedidos;

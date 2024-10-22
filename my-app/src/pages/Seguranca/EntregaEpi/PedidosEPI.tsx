// my-app/src/pages/Manufatura/AvaDesenpenho/Avaliacoes.tsx
import VirtualizedTable from '../../../components/Tables/VirtualizedTable/VirtualizedTable';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import Alert from '../../../components/Alerts/AlertSnackbar';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import api from '../../../config/axiosConfig';
import { Cancel } from '@mui/icons-material';

interface Data {
    [key: string]: any;
}

//COLUNAS
const predefinedColumns = [
    { width: 80, label: 'REGISTRO', dataKey: 'REGISTRO' },
    { width: 90, label: 'NOME', dataKey: 'NOME' },
    { width: 90, label: 'DATA', dataKey: 'DATA' },
    { width: 80, label: 'ITEM', dataKey: 'ITEM' },
    { width: 110, label: 'DESCRIÇÃO', dataKey: 'DESCRICAO' },
    { width: 50, label: 'QTD', dataKey: 'QTD' },
    { width: 80, label: 'ÁREA', dataKey: 'AREA' },
    { width: 80, label: 'TURNO', dataKey: 'TURNO' },
    { width: 50, label: '', dataKey: 'RUN' },
    { width: 50, label: '', dataKey: 'DELETE' },
];

interface PedidosProps {
    onRowSelect: (data: Data) => void;
}

const Pedidos = ({ onRowSelect }: PedidosProps) => {
    //CONSTANTES
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [columns] = useState(predefinedColumns);
    const [rows, setRows] = useState<Data[]>([]);
    const [openDialog, setOpenDialog] = useState(false); // State para abrir diálogo
    const [rowToDelete, setRowToDelete] = useState<Data | null>(null); // Estado para armazenar o item a ser deletado
    const token = Cookies.get('token');
    const clear = Cookies.get('clear');

    const CloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        listAva();
    }, [clear]);

    //LISTAR FORMULARIO
    const listAva = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        try {
            const response = await api.get<Data[]>('/auth/pedidos_epi', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const formattedData = response.data.map(row => {
                const data = row.EPI_DATA ? row.EPI_DATA.split('T')[0] : null;
                if (row.EPI_CODIGO != null) {
                    return {
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
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleOpenDialog(row)}
                            >
                                <Cancel />
                            </IconButton>,
                    };
                }
                return null;
            }).filter(row => row !== null);
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
        console.log('row:', row)
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setRowToDelete(null);
    };

    const handleRecusa = async () => {
        if (rowToDelete?.EPI_CODIGO) {
            try {
                const response = await api.put('/auth/recusa_epi', {id: rowToDelete.EPI_CODIGO}, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
          
                  if (response.status === 200) {
                    setSnackbarMessage('Item recusado com sucesso!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    handleCloseDialog();
                  }
                setRows(prevRows => prevRows.filter(row => row?.ID !== rowToDelete?.EPI_CODIGO));

            } catch (error) {
                console.error('Erro ao deletar o item:', error);
                setSnackbarMessage('Erro ao deletar o item');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <Box display={'flex'} flexDirection={"column"} gap={2}>
            <VirtualizedTable columns={columns} data={rows} />
            <Alert
                open={snackbarOpen}
                handleClose={CloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />

            {/* Diálogo de Confirmação */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
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
        </Box>
    );
};

export default Pedidos;

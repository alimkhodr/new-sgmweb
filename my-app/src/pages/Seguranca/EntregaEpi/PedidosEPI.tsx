// my-app/src/pages/Manufatura/AvaDesenpenho/Avaliacoes.tsx
import VirtualizedTable from '../../../components/Tables/VirtualizedTable/VirtualizedTable';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Box } from '@mui/system';
import Alert from '../../../components/Alerts/AlertSnackbar';
import { IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import api from '../../../config/axiosConfig';

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

    return (
        <Box display={'flex'} flexDirection={"column"} gap={2}>
            <VirtualizedTable columns={columns} data={rows} />
            <Alert
                open={snackbarOpen}
                handleClose={CloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Box>
    );
};

export default Pedidos;

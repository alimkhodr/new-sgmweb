// my-app/src/pages/Manufatura/AvaDesenpenho/Avaliacoes.tsx
import VirtualizedTable from '../../../components/Tables/VirtualizedTable/VirtualizedTable';
import 'dayjs/locale/pt-br';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Box } from '@mui/system';
import Alert from '../../../components/Alerts/AlertSnackbar';
import axios from 'axios';
import { IconButton, MenuItem, TextField } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import api from '../../../config/axiosConfig';

interface Data {
    [key: string]: any;
}

//COLUNAS
const predefinedColumns = [
    { width: 80, label: 'REGISTRO', dataKey: 'REGISTRO' },
    { width: 90, label: 'NOME', dataKey: 'NOME' },
    { width: 80, label: 'ADMISSÃO', dataKey: 'ADMISSAO' },
    { width: 95, label: 'CARGO', dataKey: 'CARGO' },
    { width: 95, label: 'ÁREA', dataKey: 'AREA' },
    { width: 80, label: 'TURNO', dataKey: 'TURNO' },
    { width: 50, label: '', dataKey: 'RUN' },
];

interface AvaliacoesProps {
    onRowSelect: (data: Data) => void;
}

const Avaliacoes = ({ onRowSelect }: AvaliacoesProps) => {
    //CONSTANTES
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [columns] = useState(predefinedColumns);
    const [rows, setRows] = useState<Data[]>([]);
    const token = Cookies.get('token');
    const currentMonth = new Date().getMonth() + 1;
    const [month, setMonth] = useState<string>(currentMonth.toString());
    const [year, setYear] = useState<string>('2024');

    const CloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const selectMonth = (event: ChangeEvent<HTMLInputElement>) => {
        setMonth(event.target.value);
        listAva();
    };

    const selectYear = (event: ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value);
        listAva();
    };

    //LISTAR FORMULARIO
    const listAva = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        try {
            const response = await api.get<Data[]>('/auth/list_ava', {
                params: { mes: month, ano: year },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200 && response.data.length === 0) {
                setSnackbarMessage('Formulário não encontrado.');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
                return;
            }
            const formattedData = response.data.map(row => {
                const admissao = row.FUN_DATA_ADMISSAO ? row.FUN_DATA_ADMISSAO.split('T')[0] : null;
                if (row.FUN_REGISTRO != null) {
                    return {
                        REGISTRO: row.FUN_REGISTRO,
                        NOME: row.FUN_NOME,
                        ADMISSAO: admissao,
                        CARGO: row.FUN_FUNCAO,
                        AREA: row.FUN_CR,
                        TURNO: row.TURNO,
                        RUN:
                            <IconButton
                                aria-label="run"
                                onClick={() => onRowSelect({
                                    REGISTRO: row.FUN_REGISTRO,
                                    NOME: row.FUN_NOME,
                                    ADMISSAO: admissao,
                                    CARGO: row.FUN_FUNCAO,
                                    AREA: row.FUN_CR,
                                    TURNO: row.TURNO,
                                    MES: month,
                                    ANO: year,
                                })}
                            >
                                <PlayCircleIcon />
                            </IconButton>,
                    };
                }
                return null;
            }).filter(row => row !== null);

            setRows(formattedData);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setSnackbarMessage('Formulário não encontrado.');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
            } else {
                console.error('Erro ao buscar dados:', error);
                setSnackbarMessage('Ocorreu um erro ao carregar os dados');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    useEffect(() => {
        listAva();
    }, []);

    const months = [
        { value: '1', label: 'Janeiro' },
        { value: '2', label: 'Fevereiro' },
        { value: '3', label: 'Março' },
        { value: '4', label: 'Abril' },
        { value: '5', label: 'Maio' },
        { value: '6', label: 'Junho' },
        { value: '7', label: 'Julho' },
        { value: '8', label: 'Agosto' },
        { value: '9', label: 'Setembro' },
        { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' },
        { value: '12', label: 'Dezembro' },
    ];

    return (
        <Box display={'flex'} flexDirection={"column"} gap={2}>
            <Box display={'flex'} flexDirection={"row"} gap={2}>
                <TextField
                    id="mes"
                    select
                    label="Mês"
                    defaultValue={month}
                    fullWidth
                    onChange={selectMonth}
                >
                    {months.map((month) => (
                        <MenuItem key={month.value} value={month.value}>
                            {month.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="ano"
                    select
                    label="Ano"
                    defaultValue={year}
                    fullWidth
                    onChange={selectYear}
                >
                    <MenuItem value="2024">2024</MenuItem>
                </TextField>
            </Box>
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

export default Avaliacoes;

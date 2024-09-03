import axios from 'axios';
import {
    Container, Grid, Typography, TextField, IconButton, Box, styled, MenuItem, InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VirtualizedTable from '../../components/Tables/VirtualizedTable/VirtualizedTable';
import Alert from '../../components/Alerts/AlertSnackbar';
import theme from '../../theme';
import StyledButton from '../../components/StyledButton/StyledButton';
import api from '../../config/axiosConfig';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

interface Data {
    [key: string]: any;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: '4px',
    '&:hover': {
        color: theme.palette.error.main,
    },
}));

const predefinedColumns = [
    { width: 50, label: 'ID', dataKey: 'ID' },
    { width: 80, label: 'PN', dataKey: 'PN' },
    { width: 90, label: 'QTD', dataKey: 'QTD' },
    { width: 80, label: 'CT/MAQ', dataKey: 'CT/MAQ' },
    { width: 95, label: 'DATA', dataKey: 'DATA' },
    { width: 95, label: 'REGISTRO', dataKey: 'REGISTRO' },
    { width: 80, label: 'CARTÃO', dataKey: 'CARTÃO' },
    { width: 80, label: 'LIMPEZA', dataKey: 'LIMPEZA' },
    { width: 50, label: '', dataKey: 'DELETAR' },
];

const Scrap = () => {
    const [columns] = useState(predefinedColumns);
    const [rows, setRows] = useState<Data[]>([]);
    const [formulario, setFormulario] = useState<string>('');
    const [ct, setCt] = useState<string>('');
    const [fixedformulario, setfixedformulario] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [aprovador, setAprovador] = useState<number>(1839);
    const [status, setStatus] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [ctOptions, setCtOptions] = useState<string[]>([]);
    const [maquinaOptions, setMaquinaOptions] = useState<string[]>([]);
    const [isLoading, setLoadingForm] = React.useState(false);
    const [statusReg, SetStatusReg] = useState(false);
    const [registro, SetReg] = useState<string>('');

    useEffect(() => {
        fetchCtMaquinaOptions();
    }, []);

    useEffect(() => {
        if (ct) {
            fetchMaquinasByCt();
        }
    }, [ct]);

    const fetchCtMaquinaOptions = async () => {
        try {
            const response = await api.post('/auth/list_linha', { ct: '' });
            const { data } = response;
            const ctSet = new Set<string>();
            const maquinaSet = new Set<string>();

            data.data.forEach((item: { CT: string, MAQUINA: string }) => {
                ctSet.add(item.CT);
                maquinaSet.add(item.MAQUINA);
            });

            setCtOptions(Array.from(ctSet));

            if (ct) {
                fetchMaquinasByCt();
            } else {
                setMaquinaOptions(Array.from(maquinaSet));
            }
        } catch (error) {
            console.error('Erro ao buscar opções de CT e MAQUINA:', error);
        }
    };

    const checkRegistro = async () => {
        try {
            const response = await api.post('/auth/checkUser', { username: registro });
            if (response.status === 200) {
                SetStatusReg(false);
            }
            else {
                SetStatusReg(true);
            }
        } catch (error) {
            console.error('Erro ao buscar o nome do usuário:', error);
        }
    };

    const createNewForm = async () => {
        try {
            setLoadingForm(true);
            const response = await api.post('/auth/createNewForm', { user: localStorage.getItem('username') });

            if (response.status === 201 && response.data && response.data.formId) {
                const newFormId = response.data.formId;
                setSnackbarMessage('Novo formulário criado com sucesso.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                setfixedformulario(newFormId);
                setFormulario(newFormId);
                setStatus("CRIADO");
            }
        } catch (error) {
            console.error('Erro ao criar novo formulário:', error);
            setSnackbarMessage('Erro ao criar novo formulário.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoadingForm(false);
        }
    };

    const fetchMaquinasByCt = async () => {
        try {
            const response = await api.post('/auth/list_linha', { ct });
            const { data } = response;
            const maquinaSet = new Set<string>();

            data.data.forEach((item: { MAQUINA: string }) => {
                maquinaSet.add(item.MAQUINA);
            });

            setMaquinaOptions(Array.from(maquinaSet));
        } catch (error) {
            console.error('Erro ao buscar máquinas para o CT selecionado:', error);
        }
    };

    const listScrap = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        const formularioStr = String(formulario).trim();

        if (!formularioStr) {
            setSnackbarMessage('O campo formulário não pode estar vazio.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await api.post<{ data: Data[] }>('/auth/list_form_scrap', { formulario: formularioStr });

            if (response.status === 200 && response.data.data.length === 0) {
                setSnackbarMessage('Formulário não encontrado.');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
                return;
            }

            const formattedData = response.data.data.map(row => {
                const data = row.DATA ? row.DATA.split('T')[0] : 'N/A';

                setfixedformulario(formularioStr);
                setAprovador(row.APROVADOR === null ? 1839 : row.APROVADOR);
                setStatus(row.STATUS);

                return {
                    ...row,
                    DATA: data,
                    DELETAR: row.STATUS === 'CRIADO' ? (
                        <StyledIconButton
                            aria-label="delete"
                            onClick={() => deleScrap(row.ID)}
                        >
                            <DeleteIcon />
                        </StyledIconButton>
                    ) : null,
                };
            });

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

    const deleScrap = async (id: number) => {
        try {
            await api.delete(`/auth/delete_scrap/${id}`);
            setSnackbarMessage('Registro deletado com sucesso');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            listScrap();
        } catch (error) {
            console.error('Erro ao deletar o registro:', error);
            setSnackbarMessage('Ocorreu um erro ao deletar o registro');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormulario(event.target.value);
    };

    const handleChangeCt = (event: ChangeEvent<HTMLInputElement>) => {
        setCt(event.target.value);
    };

    const handleChangeReg = (event: ChangeEvent<HTMLInputElement>) => {
        SetReg(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            listScrap();
        }
    };

    const handleCheckUser = () => {
        checkRegistro();
    };


    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Grid
                component="main"
                sx={{ p: 5, marginBottom: 5, marginTop: 12 }}
                bgcolor={theme.palette.background.paper}
                borderRadius={2}
            >
                <Grid>
                    <Typography variant="h1" padding={'0 0 30px 0'} fontWeight={'bold'}>
                        Apontamento de scrap
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                            marginBottom: { xs: 2, md: 0 },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            justifyContent: 'space-between',
                        }}
                    >
                        <StyledButton
                            onClick={createNewForm}
                            loading={isLoading}
                            startIcon={<AddIcon />}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Novo formulário
                        </StyledButton>
                        <TextField
                            required
                            id="outlined-required"
                            label="Formulário"
                            value={formulario}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <Box gap={2} display={'flex'}>
                            <TextField
                                id="outlined-select-ct"
                                required
                                select
                                label="CT"
                                value={ct}
                                onChange={handleChangeCt}
                                sx={{ width: 1 / 2 }}
                            >
                                {ctOptions.map(ctOption => (
                                    <MenuItem key={ctOption} value={ctOption}>{ctOption}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-maquina"
                                required
                                select
                                label="Maq."
                                defaultValue=""
                                sx={{ width: 1 / 2 }}
                            >
                                {maquinaOptions.map(maquina => (
                                    <MenuItem key={maquina} value={maquina}>{maquina}</MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DatePicker
                                label="Data"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                maxDate={dayjs()}
                            />
                        </LocalizationProvider>
                        <TextField
                            required
                            id="outlined-required"
                            label="Registro"
                            error={statusReg}
                            onChange={handleChangeReg}
                            onBlur={handleCheckUser}
                        />
                        <TextField required id="outlined-required" label="Partnumber" />
                        <TextField id="outlined-select-currency" select label="Turno" defaultValue="1">
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                        </TextField>
                        <TextField
                            required
                            id="outlined-required"
                            label="Quantidade"
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                inputProps: { min: 0, step: 1 },
                            }}
                        />
                        <TextField required id="outlined-required" label="Código de Scrap" />
                        <TextField
                            required
                            id="outlined-required"
                            label="Cartão Vermelho"
                            sx={{ display: status !== 'CRIADO' ? 'none' : 'block' }}
                        />
                        <TextField required id="outlined-required" label="Material de Limpeza" />

                        <StyledButton
                            variant="contained"
                            disabled={rows.length > 0 && status !== 'CRIADO' || fixedformulario === ''}
                        >Apontar</StyledButton>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={9}
                        sx={{
                            minHeight: 500,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                        gap={2}
                    >
                        <Box
                            p={2}
                            display={'flex'}
                            alignItems={'center'}
                            flexDirection={{ xs: "column", md: "row" }}
                            sx={{
                                border: `1px solid ${theme.palette.grey[400]}`,
                                borderRadius: "5px",
                            }}
                            gap={2}
                        >
                            <Box width={"100%"}>
                                <Typography variant="h5" component="div">
                                    <strong>FORMULÁRIO: </strong> {fixedformulario}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {fixedformulario && (
                                        <span
                                            style={{
                                                color: status === 'CRIADO'
                                                    ? theme.palette.warning.main
                                                    : status === 'ENVIADO'
                                                        ? theme.palette.info.main
                                                        : status === 'APROVADO'
                                                            ? theme.palette.success.main
                                                            : 'inherit'
                                            }}
                                        >
                                            {status}
                                        </span>
                                    )}
                                </Typography>
                            </Box>
                            <Box>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Aprovador"
                                    value={aprovador === null ? 0 : aprovador}
                                    onChange={(event) => setAprovador(parseInt(event.target.value, 10))}
                                    disabled={rows.length > 0 && status !== 'CRIADO' || fixedformulario === ''}
                                    sx={{ minWidth: 130}}
                                >
                                    <MenuItem value={1839}>ROBSON</MenuItem>
                                    <MenuItem disabled value={534}>ELCIO</MenuItem>
                                    <MenuItem disabled value={2342}>HUMBERTO</MenuItem>
                                    <MenuItem disabled value={2074}>ELLEN</MenuItem>
                                    <MenuItem disabled value={2809}>ZOLTAN</MenuItem>
                                    <MenuItem disabled value={1836}>LEANDRO</MenuItem>
                                </TextField>
                            </Box>
                            <StyledButton
                                variant="contained"
                                disabled={rows.length > 0 && status !== 'CRIADO' || fixedformulario === ''}
                            >
                                Enviar
                            </StyledButton>
                        </Box>
                        <Box
                            sx={{
                                flex: '1 1 auto',
                                overflow: 'auto',
                            }}
                        >
                            <VirtualizedTable columns={columns} data={rows} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Alert
                open={snackbarOpen}
                handleClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Container>
    );
};

export default Scrap;

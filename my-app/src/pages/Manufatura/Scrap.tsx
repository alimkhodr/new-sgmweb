import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, TextField, IconButton, Box, styled, colors } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VirtualizedTable from '../../components/Tables/VirtualizedTable/VirtualizedTable';
import Alert from '../../components/Alerts/AlertSnackbar';
import theme from '../../theme';
import StyledButton from '../../components/StyledButton/StyledButton';

interface Data {
    [key: string]: any;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding:"4px",
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
    { width: 50, label: '', dataKey: 'DELETAR' }
];

const Scrap = () => {
    const [columns] = useState(predefinedColumns);
    const [rows, setRows] = useState<Data[]>([]);
    const [formulario, setFormulario] = useState<string>('');
    const [fixedformulario, setfixedformulario] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const timer = React.useRef<ReturnType<typeof setTimeout>>();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const listScrap = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        if (!formulario.trim()) {
            setSnackbarMessage("O campo formulário não pode estar vazio.");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post<{ data: Data[] }>('http://localhost:5000/api/auth/list_form_scrap', { formulario });

            if (response.status === 200 && response.data.data.length === 0) {
                setSnackbarMessage("Formulário não encontrado.");
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
                return;
            }

            const formattedData = response.data.data.map(row => {
                setfixedformulario(formulario);
                return {
                    ...row,
                    DATA: row.DATA.split('T')[0],
                    DELETAR: (
                        <StyledIconButton aria-label="delete" onClick={() => deleScrap(row.ID)}>
                            <DeleteIcon/>
                        </StyledIconButton>
                    )
                };
            });
            setRows(formattedData);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setSnackbarMessage("Formulário não encontrado.");
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
            } else {
                console.error("Erro ao buscar dados:", error);
                setSnackbarMessage("Ocorreu um erro ao carregar os dados");
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };


    const deleScrap = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/delete_scrap/${id}`);
            setRows(prevRows => prevRows.filter(row => row.ID !== id));
            setSnackbarMessage("Registro deletado com sucesso");
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Erro ao deletar o registro:", error);
            setSnackbarMessage("Ocorreu um erro ao deletar o registro");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormulario(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            listScrap();
        }
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
                    <Typography variant="h1" padding={"0 0 30px 0"} fontWeight={"bold"}>
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
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "space-between"
                        }}
                    >
                        <StyledButton variant="contained">Novo formulário</StyledButton>
                        <TextField
                            required
                            id="outlined-required"
                            label="Formulário"
                            fullWidth
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <Box gap={2} display={"flex"} >
                            <TextField
                                required
                                id="outlined-required"
                                label="CT"
                                sx={{ width: 1 / 2 }}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Maquina"
                                sx={{ width: 1 / 2 }}
                            />
                        </Box>

                        <TextField
                            required
                            id="outlined-required"
                            label="Data"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Registro"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Partnumber"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Turno"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Quantidade"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Código de Scrap"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Cartão Vermelho"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Material de Limpeza"
                            fullWidth
                        />
                        <StyledButton variant="contained">Apontar</StyledButton>
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
                            gap={1}
                        >
                            <Box width={"100%"}>
                                <Typography variant="h5" component="div">
                                    <strong>Formulário -</strong> {fixedformulario}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    <strong>Status - </strong>{rows.length > 0 && rows[0].STATUS}
                                </Typography>
                            </Box>
                            <Box width={"100%"}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Aprovador"
                                    fullWidth
                                />
                            </Box>
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

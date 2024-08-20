import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VirtualizedTable from '../../components/Tables/VirtualizedTable/VirtualizedTable';
import Alert from '../../components/Alerts/AlertSnackbar';
import theme from '../../theme';

interface Data {
    [key: string]: any;
}

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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const timer = React.useRef<ReturnType<typeof setTimeout>>();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const listScrap = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formulario.trim()) {
            setSnackbarMessage("O campo formulário não pode estar vazio.");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post<{ data: Data[] }>('http://localhost:5000/api/auth/list_form_scrap', { formulario });
            const formattedData = response.data.data.map(row => {
                return {
                    ...row,
                    DATA: row.DATA.split('T')[0], // Remove a parte 'T00:00:00.000Z'
                    DELETAR: (
                        <IconButton aria-label="delete" onClick={() => deleScrap(row.ID)}>
                            <DeleteIcon />
                        </IconButton>
                    )
                };
            });
            setRows(formattedData);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setSnackbarMessage("Ocorreu um erro ao carregar os dados");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
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

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        <Container>
            <Grid
                component="main"
                sx={{ p: 5, marginBottom: 5, marginTop: 12 }}
                bgcolor={theme.palette.background.paper}
                borderRadius={5}
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
                        <Button variant="contained" color="secondary">
                            <strong>Novo formulário</strong>
                        </Button>
                        <TextField
                            required
                            id="outlined-required"
                            label="Formulário"
                            fullWidth
                            onChange={handleChange}
                        />
                        {/* Outros TextFields conforme necessário */}
                        <Button onClick={listScrap} variant="contained" color="secondary">
                            <strong>Buscar Formulário</strong>
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={9} sx={{ minHeight: 500 }}>
                        <VirtualizedTable columns={columns} data={rows} />
                    </Grid>
                </Grid>
            </Grid>
            {/* Alerts */}
            <Alert
                open={snackbarOpen}
                handleClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Container>
    );
}

export default Scrap;

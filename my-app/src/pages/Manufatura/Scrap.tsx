import {Container, Grid, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import VirtualizedTable from "../../components/Tables/VirtualizedTable/VirtualizedTable";
import { useState } from "react";
import axios from "axios";
import ErrorAlert from "../../components/Alerts/AlertSnackbar";
import StyledButton from "../../components/StyledButton/StyledButton";

interface Data {
    [key: string]: any; // Ajuste conforme necessário
}


const predefinedColumns = [
    { width: 50, label: 'ID', dataKey: 'ID' },
    { width: 100, label: 'PN', dataKey: 'PN' },
    { width: 100, label: 'QTD', dataKey: 'QTD' },
    { width: 100, label: 'CT/MAQ', dataKey: 'CT/MAQ' },
    { width: 100, label: 'DATA', dataKey: 'DATA' },
    { width: 100, label: 'REGISTRO', dataKey: 'REGISTRO' },
    { width: 100, label: 'CARTÃO', dataKey: 'CARTÃO' },
    { width: 100, label: 'LIMPEZA', dataKey: 'LIMPEZA' }
];

const Scrap = () => {
    const [columns] = useState(predefinedColumns);
    const [rows, setRows] = useState<Data[]>([]);
    const [formulario, setFormulario] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const listScrap = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formulario.trim()) {
            setSnackbarMessage("O campo formulário não pode estar vazio.");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post<{ data: Data[] }>('http://localhost:5000/api/list_form_scrap', { formulario }); 
            const formattedData = response.data.data.map(row => {
                return {
                    ...row,
                    DATA: row.DATA.split('T')[0] // Remove a parte 'T00:00:00.000Z'
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
                        }}
                    >
                        <StyledButton>
                            <strong>Novo formulário</strong>
                        </StyledButton>
                        <hr/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Formulário"
                            fullWidth
                            onChange={handleChange}
                        />
                        <StyledButton onClick={listScrap}>
                            <strong>Buscar Formulário</strong>
                        </StyledButton>
                    </Grid>
                    <Grid item xs={12} md={9} sx={{ minHeight: 500 }}>
                        <VirtualizedTable columns={columns} data={rows} />
                    </Grid>
                </Grid>
            </Grid>
            {/* Alerts */}
            <ErrorAlert
                open={snackbarOpen}
                handleClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Container>
    );
}

export default Scrap;

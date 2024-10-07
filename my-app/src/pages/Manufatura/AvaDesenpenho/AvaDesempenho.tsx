import { Container, Grid, Typography, Box, TextField, IconButton, Modal, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from '@mui/material';
import Alert from '../../../components/Alerts/AlertSnackbar';
import theme from '../../../theme';
import 'dayjs/locale/pt-br';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Avaliacoes from './Avaliacoes';
import AvaStepper from './AvaStepper';
import { ArrowBack, QrCodeScanner } from '@mui/icons-material';
import Scanner from '../../../components/Scanner/Scanner';
import api from '../../../config/axiosConfig';
import StyledButton from '../../../components/StyledButton/StyledButton';

interface Data {
    [key: string]: any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 2
};

const AvaDesempenho = () => {
    const token = Cookies.get('token');
    const [selectedData, setSelectedData] = useState<Data | null>(null);
    const [barcode, setBarcode] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [statusCracha, SetStatusCracha] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const OpenModal = () => setOpen(true);
    const CloseModal = () => setOpen(false);
    const CloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.barcode && event.data.barcode.startsWith('69') && event.data.barcode.length === 14) {
                setBarcode(event.data.barcode);
                CloseModal();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    useEffect(() => {
        if (barcode) {
            checkCracha();
        }
    }, [barcode]);

    const checkCracha = async () => {
        try {
            const response = await api.get('/auth/checkCodin', {
                params: { barcode: barcode },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 204) {
                SetStatusCracha(true);
            }
            else {
                const row = response.data;
                if (row && row.FUN_REGISTRO) {
                    if (row.FUN_REGISTRO != selectedData?.REGISTRO) {
                        SetStatusCracha(true);
                    }
                    else {
                        SetStatusCracha(false);
                    }
                }
            }
        } catch (error) {
            console.error('Crachá não encontrado:', error);
            setSnackbarMessage('Crachá não encontrado');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <Container>
            <Grid
                component="main"
                sx={{ p: 5, marginBottom: 5, marginTop: 12 }}
                bgcolor={theme.palette.background.paper}
                borderRadius={2}
            >
                <Grid padding={'0 0 30px 0'} display={"flex"} flexDirection={"row"} gap={1}>
                    <Box display={selectedData ? 'flex' : 'none'} >
                        <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => setSelectedData(null)}
                        >
                            <ArrowBack fontSize="inherit" />
                        </IconButton>
                    </Box>
                    <Typography variant="h3" fontWeight={'bold'} display={'flex'} alignItems={'center'}>
                        Avaliação de Desempenho
                    </Typography>
                </Grid>
                <Grid display={"flex"} flexDirection={"column"} gap={2}>
                    <Box display={selectedData ? 'none' : 'flex'} flexDirection={"column"} gap={2}>
                        <Avaliacoes onRowSelect={setSelectedData} />
                    </Box>
                    <Box display={selectedData ? 'flex' : 'none'} flexDirection={"column"} gap={2}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="nome"
                                        label="Nome"
                                        value={selectedData?.NOME || ''}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="registro"
                                        label="Registro"
                                        value={selectedData?.REGISTRO || ''}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="admissao"
                                        label="Admissão"
                                        value={selectedData?.ADMISSAO || ''}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="cargo"
                                        label="Cargo"
                                        value={selectedData?.CARGO || ''}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="area"
                                        label="Área"
                                        value={selectedData?.AREA || ''}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="turno"
                                        label="Turno"
                                        value={selectedData?.TURNO || ''}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="linha"
                                        label="Linha"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography>{selectedData?.MES || ''}{selectedData ? "/" : ''}{selectedData?.ANO || ''}</Typography>
                        <AvaStepper />
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-cracha">Crachá</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-cracha"
                                type='text'
                                value={barcode}
                                error={statusCracha}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={OpenModal}>
                                            <QrCodeScanner />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Crachá"
                                fullWidth
                            />
                        </FormControl>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography variant='caption'>EAGP_4-3_HR-SAO_01-F08_PT</Typography>
                            <StyledButton
                                // onClick={createNewForm}
                                // loading={isLoading}
                                loadingPosition="end"
                                variant="contained"
                                disabled
                            >
                                Salvar
                            </StyledButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Modal para o scanner */}
            <Modal
                open={open}
                onClose={CloseModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Escanear crachá</h2>
                    <Scanner />
                    <Button onClick={CloseModal}>Cancelar</Button>
                </Box>
            </Modal>
            <Alert
                open={snackbarOpen}
                handleClose={CloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Container>
    );
};

export default AvaDesempenho;

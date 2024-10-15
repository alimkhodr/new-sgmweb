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

interface FormData {
    resultado: number;
    respostas: number[];
    area_atuacao: string;
    avaliacao1: string;
    avaliacao2: string;
    obs1: string;
    obs2: string;
    planoAcao: string;
    registro: number;
    userType: string;
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
    const [isLoading, setLoading] = useState(false);
    const [steps, setSteps] = useState<Data | null>(null);
    const [barcode, setBarcode] = useState<string | null>(null);
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

    const createNewForm = async () => {
        try {
            if (steps) {
                setLoading(true);
                const respostas: number[] = [];

                Object.keys(steps).forEach((key: string) => {
                    if (key.startsWith("PERGUNTA")) {
                        respostas.push(steps[key as keyof typeof steps] as number);
                    }
                });

                const formData: FormData = {
                    resultado: steps.RESULTADO as number,
                    respostas: respostas,
                    area_atuacao: steps.AREA_ATUACAO as string,
                    avaliacao1: steps.AVALIACAO_1 as string,
                    avaliacao2: steps.AVALIACAO_2 as string,
                    obs1: steps.JUSTIFICA_HABILIDADE as string,
                    obs2: steps.JUSTIFICA_POTENCIAL as string,
                    planoAcao: steps.PLANO_ACAO as string,
                    registro: selectedData?.REGISTRO ?? 0,
                    userType: selectedData?.USER_TYPE
                };

                const response = await api.post('/auth/createNewFormAva', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status === 201) {
                    setSnackbarMessage('Avaliação de desempenho feita com sucesso.');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }
            }
        } catch (error) {
            console.error('Erro ao criar novo formulário:', error);
            setSnackbarMessage('Erro ao criar novo formulário.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

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

    const checkDisabled = () => {
        if (steps) {
            // return !selectedData || !steps.RESULTADO || steps.AVALIACAO_1 === 'Não' && !steps.JUSTIFICA_HABILIDADE || steps.AVALIACAO_2 === 'Sim' && !steps.JUSTIFICA_POTENCIAL || !steps.PLANO_ACAO || !steps.AVALIACAO_1 || !steps.AVALIACAO_2;
            return !selectedData || !barcode || statusCracha === true || !steps.RESULTADO || steps.AVALIACAO_1 === 'Não' && !steps.JUSTIFICA_HABILIDADE || steps.AVALIACAO_2 === 'Sim' && !steps.JUSTIFICA_POTENCIAL || !steps.PLANO_ACAO || !steps.AVALIACAO_1 || !steps.AVALIACAO_2;
        }
    };

    const clear = () => {
        setSelectedData(null);
        setSteps(null);
        setBarcode(null);
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
                            aria-label="open"
                            size="large"
                            onClick={clear}
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
                            </Grid>
                        </Box>
                        <Typography>{selectedData?.MES || ''}{selectedData ? "/" : ''}{selectedData?.ANO || ''}</Typography>
                        <AvaStepper key={selectedData ? 'avaliacao' : 'reset'} onChangesetSteps={setSteps} />
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
                                loading={isLoading}
                                loadingPosition="end"
                                variant="contained"
                                onClick={createNewForm}
                                disabled={checkDisabled()}
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

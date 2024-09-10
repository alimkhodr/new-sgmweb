import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Typography } from '@mui/material';
import Alert from '../../components/Alerts/AlertSnackbar';
import theme from '../../theme';
import 'dayjs/locale/pt-br';
import { useState } from 'react';
import { QrCodeScanner } from '@mui/icons-material';

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
    borderRadius:2
  };
  

const EntregaEPI = () => {
    //CONSTANTES
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const CloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    //AÇÕES
    const [open, setOpen] = useState(false);
    const OpenModal = () => {
        setOpen(true);
    };
    const CloseModal = () => {
        setOpen(false);
    };

    //DESIGN
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
                        Entrega de EPI
                    </Typography>
                </Grid>
                <Grid>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Crachá</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-cracha"
                            type='text'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={OpenModal}>
                                        <QrCodeScanner />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Cracha"
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={CloseModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style}}>
                    <h2 id="child-modal-title">Ecanear crahá</h2>
                    <p id="child-modal-description">
                        -- CAMERA ESCANEANDO AQUI --
                    </p>
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

export default EntregaEPI;

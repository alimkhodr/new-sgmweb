import { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField, Typography } from '@mui/material';
import Alert from '../../components/Alerts/AlertSnackbar';
import theme from '../../theme';
import { QrCodeScanner } from '@mui/icons-material';
import Scanner from '../../components/Scanner/Scanner';
import api from '../../config/axiosConfig';
import Cookies from 'js-cookie';

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

const EntregaEPI = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [open, setOpen] = useState(false);
  const [statusCracha, SetStatusCracha] = useState(false);
  const [barcode, setBarcode] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const token = Cookies.get('token');

  const OpenModal = () => {
    setOpen(true);
  };

  const CloseModal = () => {
    setOpen(false);
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

  //VALIDAR CRACHÁ
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
        if (row && row.FUN_NOME) {
          setNome(row.FUN_NOME.toUpperCase());
        }
        SetStatusCracha(false);
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
        <Grid>
          <Typography variant="h1" padding={'0 0 30px 0'} fontWeight={'bold'}>
            Entrega de EPI
          </Typography>
        </Grid>
        <Grid>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <TextField
              id="outlined-required"
              label="Nome"
              value={nome}
              disabled
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
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Escanear crachá</h2>
          <Scanner />
          <Button onClick={CloseModal}>Cancelar</Button>
        </Box>
      </Modal>
      <Alert
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
};

export default EntregaEPI;

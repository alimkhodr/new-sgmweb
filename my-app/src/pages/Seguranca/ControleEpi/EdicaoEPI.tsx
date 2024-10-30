import { useEffect, useState } from 'react';
import { Box, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import Alert from '../../../components/Alerts/AlertSnackbar';
import theme from '../../../theme';
import { ArrowBack } from '@mui/icons-material';
import api from '../../../config/axiosConfig';
import Cookies from 'js-cookie';
import StyledButton from '../../../components/StyledButton/StyledButton';
import EstoqueEPI from './EstoqueEPI';

interface Data {
  [key: string]: any;
}

const EntregaEPI = () => {
  const token = Cookies.get('token');
  const [selectedData, setSelectedData] = useState<Data | null>(null);
  const [isLoading, setLoading] = useState(false);

  const [item, setItem] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [conta, setConta] = useState<string>('');
  const [ca, setCa] = useState<string>('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const CloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (selectedData) {
      setItem(selectedData.ITEM);
      setDescricao(selectedData.DESCRICAO);
      setConta(selectedData.CONTA);
      setCa(selectedData.CA);
    }
  }, [selectedData]);

  const checkDisabled = () => {
    return !selectedData || !item || !conta || !descricao;
  };

  const clear = () => {
    setSelectedData(null);
    setItem('');
    setDescricao('');
    setConta('');
    setCa('');
    Cookies.set('clear', 'clear', { expires: 7 });
  };

  const updatePedido = async () => {
    try {
      if (selectedData) {
        setLoading(true);
        const response = await api.put('/auth/update_epi', { id: selectedData.id, item: item, descricao: descricao, conta: conta, ca: sanitizeField(ca)}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setSnackbarMessage('EPI atualizado com sucesso.');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          clear();
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar EPI:', error);
      setSnackbarMessage('Erro ao atualizar EPI.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!checkDisabled()) {
      updatePedido();
    }
  };

  const sanitizeField = (value: string | undefined): string | null => {
    if (value === undefined || value.trim() === '') {
      return null;
    }
    return value;
  };

  return (
    <Container>
      <Grid
        component="main"
        sx={{ p: 5, marginBottom: 5, marginTop: 12 }}
        bgcolor={theme.palette.background.paper}
        borderRadius={2}
        maxWidth='90vw'
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
            Controle de EPI
          </Typography>
        </Grid>
        <Grid display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={selectedData ? 'none' : 'flex'} flexDirection={"column"}>
            <EstoqueEPI onRowSelect={setSelectedData} />
          </Box>
          <Box display={selectedData ? 'flex' : 'none'} flexDirection={"column"} gap={2}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="ID"
                    label="Item"
                    value={item}
                    fullWidth
                    onChange={(e) => setItem(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="DESC"
                    label="Descrição"
                    value={descricao}
                    fullWidth
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="CONTA"
                    label="Conta"
                    value={conta}
                    fullWidth
                    onChange={(e) => setConta(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="CA"
                    label="C.A"
                    value={ca}
                    fullWidth
                    onChange={(e) => setCa(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            </form>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <StyledButton
                loading={isLoading}
                variant="contained"
                disabled={checkDisabled()}
                onClick={updatePedido}
              >
                Salvar
              </StyledButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
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

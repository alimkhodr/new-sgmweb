import { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, TextField, Typography } from '@mui/material';
import Alert from '../../../components/Alerts/AlertSnackbar';
import theme from '../../../theme';
import { ArrowBack, QrCodeScanner } from '@mui/icons-material';
import Scanner from '../../../components/Scanner/Scanner';
import api from '../../../config/axiosConfig';
import Cookies from 'js-cookie';
import StyledButton from '../../../components/StyledButton/StyledButton';
import PedidosEPI from './PedidosEPI';

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

interface Data {
  [key: string]: any;
}

const EntregaEPI = () => {
  const token = Cookies.get('token');
  const [descOptions, setDescOptions] = useState<string[]>([]);
  const [desc, setDesc] = useState<string>('');
  const [contaOptions, setContaOptions] = useState<string[]>([]);
  const [conta, setConta] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [secao, setSecao] = useState<string>('');
  const [secaoOptions, setSecaoOptions] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<Data | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [qtd, setQtd] = useState<string>('');
  const [item, setItem] = useState<string>('');
  const [subconta, setSubconta] = useState<string>('');
  const [ca, setCa] = useState<string>('');
  const [barcode, setBarcode] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [statusCracha, SetStatusCracha] = useState(false);
  const [itemsData, setItemsData] = useState<Data[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const OpenModal = () => setOpen(true);
  const CloseModal = () => setOpen(false);
  const CloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (selectedData) {
      setQtd(selectedData.QTD);
      setDesc(selectedData.DESCRICAO);
      setConta(selectedData.CONTA);
      setArea(selectedData.AREA);
      setSecao(selectedData.SECAO);
      setItem(selectedData.ITEM);
      setSubconta(selectedData.SUBCONTA);
      setCa(selectedData.CA);
      fetchItems();
      fetchConta();
      fetchArea();
      fetchSecao();
    }
  }, [selectedData]);


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
    if (desc) {
      const foundItem = itemsData.find(item => item.descricao === desc);
      const foundSubconta = itemsData.find(subConta => subConta.descricao === desc);
      const foundCa = itemsData.find(ca => ca.descricao === desc);
      if (foundItem) {
        setItem(foundItem.item);
      }
      if (foundSubconta) {
        setSubconta(foundSubconta.subConta);
      }
      if (foundCa) {
        setCa(foundCa.ca);
      }
    }
  }, [desc]);


  const fetchItems = async () => {
    try {
      const response = await api.get('/auth/controle_epi', {
        headers: { Authorization: `Bearer ${token}` }
      });

      let fetchedItemsData = response.data.map((row: any) => ({
        descricao: row.CEPI_DESCRICAO,
        item: row.CEPI_CODIGO,
        subConta: row.CEPI_CONTA,
        ca: row.CEPI_CA
      }));

      setItemsData(fetchedItemsData);
      setDescOptions(fetchedItemsData.map((item: { descricao: any; }) => item.descricao));
    } catch (error) {
      console.error('Erro ao buscar opções de EPI:', error);
      setSnackbarMessage('Erro ao buscar opções de EPI');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  const fetchConta = async () => {
    try {
      const response = await api.get('/auth/dep_conta', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const conta = response.data.map((row: any) => row.DEP_CONTA);
      setContaOptions(conta);

    } catch (error) {
      console.error('Erro ao buscar contas:', error);
      setSnackbarMessage('Erro ao buscar opções de contas');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  const fetchArea = async () => {
    try {
      const response = await api.get('/auth/area_epi', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const area = response.data.map((row: any) => row.AEPI_DESCRICAO);
      setAreaOptions(area);

    } catch (error) {
      console.error('Erro ao buscar areas:', error);
      setSnackbarMessage('Erro ao buscar opções de areas');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const fetchSecao = async () => {
    try {
      const response = await api.get('/auth/dep_secao', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const secao = response.data.map((row: any) => row.DEP_SECAO);
      setSecaoOptions(secao);

    } catch (error) {
      console.error('Erro ao buscar seção:', error);
      setSnackbarMessage('Erro ao buscar opções de seções');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  const updateEntrega = async () => {
    try {
      if (barcode && selectedData?.ID && qtd) {
        setLoading(true);

        const response = await api.put('/auth/entrega_epi', { qtd: qtd, id: selectedData.ID, item: item, secao: secao, area: area, ca: ca }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setSnackbarMessage('EPI entregue com sucesso.');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          clear();
        }
      }
    } catch (error) {
      console.error('Erro ao entregar EPI:', error);
      setSnackbarMessage('Erro ao entregar EPI.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
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
    return !selectedData || !barcode || statusCracha === true || qtd === '';
  };

  const clear = () => {
    setSelectedData(null);
    setBarcode(null);
    SetStatusCracha(false);
    Cookies.set('clear', 'clear', { expires: 7 });
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
            Entrega de EPI
          </Typography>
        </Grid>
        <Grid display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={selectedData ? 'none' : 'flex'} flexDirection={"column"}>
            <PedidosEPI onRowSelect={setSelectedData} />
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
                    id="turno"
                    label="Turno"
                    value={selectedData?.TURNO || ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="data"
                    label="Data"
                    value={selectedData?.DATA || ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="item"
                    label="Item"
                    value={item}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="subconta"
                    label="Sub-Conta"
                    value={subconta}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="ca"
                    label="C.A"
                    value={ca}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="area"
                    label="Área"
                    value={area}
                    select
                    onChange={(e) => setArea(e.target.value)}
                    fullWidth
                  >
                    {areaOptions.map((areaOption) => (
                      <MenuItem key={areaOption} value={areaOption}>{areaOption}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="conta"
                    label="Conta"
                    value={conta}
                    select
                    onChange={(e) => setConta(e.target.value)}
                    fullWidth
                  >
                    {contaOptions.map((contaOption) => (
                      <MenuItem key={contaOption} value={contaOption}>{contaOption}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="secao"
                    label="Seção"
                    value={secao}
                    select
                    onChange={(e) => setSecao(e.target.value)}
                    fullWidth
                  >
                    {secaoOptions.map((secaoOption) => (
                      <MenuItem key={secaoOption} value={secaoOption}>{secaoOption}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="quantidade"
                    label="Quantidade"
                    value={qtd}
                    fullWidth
                    type="number"
                    onChange={(e) => { let value = e.target.value; setQtd(value && parseInt(value) >= 0 ? value : ''); }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="descricao"
                    label="Descrição"
                    select
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    fullWidth
                  >
                    {descOptions.map((descOption) => (
                      <MenuItem key={descOption} value={descOption}>{descOption}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-cracha">Crachá</InputLabel>
              <OutlinedInput
                id="outlined-adornment-cracha"
                type='text'
                value={barcode ?? ''}
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
              <StyledButton
                // onClick={createNewForm}
                loading={isLoading}
                variant="contained"
                onClick={updateEntrega}
                disabled={checkDisabled()}
              >
                Confirmar Entrega
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

export default EntregaEPI;

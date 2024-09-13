import { Box, Container, Grid, styled, Typography, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import theme from "../theme";
import api from '../config/axiosConfig';
import Cookies from 'js-cookie';
import Alert from '../components/Alerts/AlertSnackbar';
import { useEffect, useState } from "react";

const SwiperContainer = styled(Box)({
  '.swiper-button-next:after': {
    content: '"next"',
    color: theme.palette.primary.main,
    fontSize: "30px"
  },
  '.swiper-button-prev:after': {
    content: '"prev"',
    color: theme.palette.primary.main,
    fontSize: "30px"
  },
  '.swiper-pagination-bullet': {
    background: theme.palette.primary.main,
    width: "5px",
    height: "5px"
  },
});

const StyledImage = styled('img')({
  width: '100%',
  height: 'auto', // Mantém a proporção correta
  borderRadius: '8px',
  objectFit: 'contain', // Garante que a imagem se ajuste sem estourar
  maxHeight: '100%', // Limita a altura da imagem ao slider
});

const TelaInicial = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = Cookies.get('token');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [fifo, setFifo] = useState<string>('');
  const [datas, setDatas] = useState<{ img: string; alt: string; href: string }[]>([]);

  useEffect(() => {
    getFifo();
    getComunicados();
  }, []);

  const getFifo = async () => {
    try {
      const response = await api.get('/auth/fifo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const row = response.data;
      if (row && row.FIFO_RGB) {
        setFifo(row.FIFO_RGB);
      }
    } catch (error) {
      console.error('Erro em fifo', error);
      setSnackbarMessage('Erro em fifo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const getComunicados = async () => {
    try {
      const response = await api.get('/auth/comunicados', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const comunicados = response.data;
      if (comunicados && Array.isArray(comunicados)) {
        const formattedData = comunicados.map((row: any) => ({
          img: `http://mfgsvr2/Comunicados/${row.URL}`,
          alt: row.NOME,
          href: row.HREF == '' ? `http://mfgsvr2/Comunicados/${row.URL}` : row.HREF
        }));
        setDatas(formattedData);
      }
    } catch (error) {
      console.error('Erro em comunicados', error);
      setSnackbarMessage('Erro em comunicados');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <SwiperContainer>
      <Container>
        <Grid
          component="main"
          sx={{ marginBottom: 5, marginTop: 12 }}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
        >
          <Grid
            sx={{ p: 5 }}
            bgcolor={theme.palette.background.paper}
            borderRadius={2}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={2}
          >
            <Typography
              variant="h1">
              Fifo do mês
            </Typography>
            <Box
              bgcolor={theme.palette.primary.main}
              color={theme.palette.primary.contrastText}
              p={'10px 20px'}
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'row'}
              alignItems={'center'}
              gap={1}
              borderRadius={4}
            >
              <Box
                height={35}
                width={35}
                bgcolor={fifo}
                borderRadius={100}
              >

              </Box>
              <Typography
                variant="h1">
                Setembro
              </Typography>
            </Box>
          </Grid>
          <Grid
            sx={{ p: 5 }}
            bgcolor={theme.palette.background.paper}
            borderRadius={2}
          >
            <Box display={'flex'} justifyContent={'center'}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                slidesPerView={1}
                style={{
                  width: isMobile ? '100%' : '50%',
                  maxWidth: isMobile ? '200px' : '400px', // Ajuste máximo da largura
                  overflow: 'hidden', // Para garantir que o conteúdo não "estoure" o slider
                }}
              >
                {datas.map((data) => (
                  <SwiperSlide key={data.img}>
                    <a href={data.href} target="_blank" rel="noopener noreferrer">
                      <StyledImage src={data.img} alt={data.alt} />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Grid>
        </Grid>
        <Alert
          open={snackbarOpen}
          handleClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      </Container>
    </SwiperContainer>
  );
}

export default TelaInicial;

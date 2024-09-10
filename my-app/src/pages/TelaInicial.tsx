import { Box, Container, Grid, styled, Typography, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import theme from "../theme";
import { fontSize, height, width } from "@mui/system";

const datas = [
  {
    img: "/Comunicados/Plano%20pet.jpg",
  },
  {
    img: "/Comunicados/Plano%20pet.jpg",
  },
  {
    img: "/Comunicados/Plano%20pet.jpg",
  },
];

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

const TelaInicial = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
              bgcolor={theme.palette.primary.light}
              color={theme.palette.primary.contrastText}
              p={'10px 20px'}
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'row'}
              alignItems={'center'}
              gap={1}
              borderRadius={3}
            >
              <Box
              height={35}
              width={35}
              bgcolor={'yellow'}
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
                    <img
                      src={data.img}
                      alt="Slide"
                      style={{
                        width: '100%',
                        height: 'auto', // Mantém a proporção correta
                        borderRadius: '8px',
                        objectFit: 'contain', // Garante que a imagem se ajuste sem estourar
                        maxHeight: '100%', // Limita a altura da imagem ao slider
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SwiperContainer>
  );
}

export default TelaInicial;

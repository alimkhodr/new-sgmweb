import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton/StyledButton';
import { useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = new URLSearchParams(location.search).get('error');

  return (
    <>
      <Container>
        <Box component="main" sx={{ p: 3, marginBottom: 5, marginTop: 12 }}>
          <Typography variant="h3">{error || '404'}</Typography>
          <Typography variant="h6">{error === '403' ? 'Acesso negado' : 'Página não encontrada'}</Typography>
          <StyledButton onClick={() => navigate('/TelaInicial')}>
            Voltar ao início
          </StyledButton>
        </Box>
      </Container>
    </>
  );
};

export default NotFoundPage;

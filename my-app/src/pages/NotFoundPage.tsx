import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton/StyledButton';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <Box component="main" sx={{ p: 3, marginBottom: 5, marginTop: 12 }}>
                    <Typography variant="h1">404</Typography>
                    <Typography variant="h6">Página não encontrada</Typography>
                    <StyledButton onClick={() => navigate('/TelaInicial')}>
                        Voltar ao início
                    </StyledButton>
                </Box>
            </Container>
        </>
    );
}

export default NotFoundPage;

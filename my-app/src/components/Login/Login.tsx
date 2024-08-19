import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import theme from '../../theme';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface LoginProps {
    setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);

            setIsAuthenticated(true);
            navigate('/TelaInicial', { replace: true });
        } catch (err: any) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}} maxWidth="xs" >
            <Box component="main" sx={{ p: 5, gap: 8}} bgcolor={theme.palette.background.paper} borderRadius={5}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="secondary" fullWidth>
                        Login
                    </Button>
                </form>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={2000} // Fecha após 2 segundos
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Define a posição do Snackbar
            >
                <Alert onClose={handleClose} severity="error">
                    Credenciais inválidas
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, IconButton, InputAdornment, OutlinedInput, TextField, Typography, FormControl, InputLabel } from '@mui/material';
import theme from '../../theme';
import Alert from '../../components/Alerts/AlertSnackbar';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginProps {
    setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
            setSnackbarMessage("Usuário ou senha incorreto");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
    


    return (
        <Container sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }} maxWidth="xs">
            <Box component="main" sx={{ p: 5, gap: 8 }} bgcolor={theme.palette.background.paper} borderRadius={5}>
                <Typography variant="h1" component="h1" gutterBottom fontWeight={"bold"}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box gap={2} display={'flex'} flexDirection={'column'}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" variant="contained" color="secondary" fullWidth>
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* Alerts */}
            <Alert
                open={snackbarOpen}
                handleClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Container>
    );
};

export default Login;

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SGM from '../../assets/images/logo/sgmweb.svg';
import Alert from '../../components/Alerts/AlertSnackbar';
import StyledButton from '../../components/StyledButton/StyledButton';
import api from '../../config/axiosConfig';
import theme from '../../theme';

interface LoginProps {
    setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [error, serError] = useState(false);
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
            const response = await api .post('/auth/login', {
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
            serError(true)
        }
    };



    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box component="main" sx={{ p: 5, gap: 4, m: 5, display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}} bgcolor={theme.palette.background.paper} borderRadius={5}>
                <img src={SGM} alt="SGM" style={{ height: "130px" }} />
                <form onSubmit={handleSubmit}>
                    <Box gap={2} display={'flex'} flexDirection={'column'}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="none"
                            error = {error}
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
                                error = {error}
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <StyledButton type="submit" variant="contained" color="secondary" fullWidth>
                            Login
                        </StyledButton>
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
        </Box>
    );
};

export default Login;

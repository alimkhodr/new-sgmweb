import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: '#0a0a0a', // Preto
            light: '#191919'
        },
        secondary: {
            main: '#F84018', // Laranja
        },
        error: {
            main: '#f44336', // Vermelho
        },
        warning: {
            main: '#ff9800', // Laranja
        },
        info: {
            main: '#2196f3', // Azul
        },
        success: {
            main: '#4caf50', // Verde
        },
        background: {
            default: '#ffffff', // Branco
            paper: '#f5f5f5', // Cinza claro
        },
    },
    typography: {
        fontFamily: "Helvetica, Arial, sans-serif",
        h1: {
            fontSize: '2.2rem',
        },
        h2: {
            fontSize: '1.5rem',
        },
    }
});

theme = responsiveFontSizes(theme);

export default theme;

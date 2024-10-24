import { createTheme, responsiveFontSizes } from "@mui/material";
import Cookies from 'js-cookie'; // Certifique-se de ter o pacote Cookies instalado e importado

// Obtém o tema atual dos cookies
const currentTheme = Cookies.get('theme');

// Define a paleta de acordo com o tema armazenado nos cookies
const palette = currentTheme === 'dark'
    ? {
        mode: 'dark', // Modo escuro
        primary: {
            dark: '#0a0a0a', // Preto
            main: '#ffffff',
            light: '#4f4e4e',
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
            default: '#121212', // Fundo preto
            paper: '#1e1e1e', // Cinza escuro
        },
    }
    : {
        mode: 'light', // Modo claro
        primary: {
            dark: '#000000', // Preto
            main: '#0a0a0a', // Preto
            light: '#b8b8b8',
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
    };

let theme = createTheme({
    //@ts-ignore
    palette,
    typography: {
        fontFamily: "Helvetica, Arial, sans-serif",
    },
});

theme = responsiveFontSizes(theme);

export default theme;

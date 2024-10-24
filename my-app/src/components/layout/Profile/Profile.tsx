import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../config/axiosConfig';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MaterialUISwitch from '../../Switch/MaterialUISwitch';
import { Contrast } from '@mui/icons-material';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [userNome, setUserNome] = useState('Usuário');
    const [userFuncao, setUserFuncao] = useState('Área');
    const [themeMode, setThemeMode] = useState(Cookies.get('theme') || 'light'); // Estado para o tema

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const token = Cookies.get('token');

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/Login', { replace: true });
    };

    useEffect(() => {
        async function fetchUserName() {
            try {
                const response = await api.get('/auth/user_data', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const row = response.data;
                if (row && row.FUN_NOME) {
                    setUserNome(row.FUN_NOME.toUpperCase());
                    setUserFuncao(row.FUN_FUNCAO.toUpperCase());
                } else {
                    console.error('Erro ao buscar o nome do usuário:');
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do usuário:', error);
            }
        }
        fetchUserName();
    }, [token]);

    const firstLetter = userNome && userNome[0].toUpperCase();

    // Função para alternar o tema
    const toggleTheme = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
        Cookies.set('theme', newTheme);
        window.location.reload();
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={userNome}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 40, height: 40 }}>{firstLetter}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar>{firstLetter}</Avatar>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography variant="subtitle1" lineHeight={1.5}>
                            {userNome}
                        </Typography>
                        <Typography variant="caption" lineHeight={1} fontSize={10}>
                            {userFuncao}
                        </Typography>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
                <Divider />
                <MenuItem onClick={(e) => e.stopPropagation()}>
                    <ListItemIcon>
                        <Contrast fontSize="small" />
                    </ListItemIcon>
                    <ListItemIcon>
                        <MaterialUISwitch
                            checked={themeMode === 'dark'}
                            onChange={toggleTheme}
                        />
                    </ListItemIcon>

                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

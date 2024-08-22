import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider, IconButton, CssBaseline, AppBar as MuiAppBar, Toolbar, Alert } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import { menuItems } from '../../../config/menuConfig';
import Logo from "../../../assets/images/logo/aptiv_logo_white.png";
import { ExpandMore } from '@mui/icons-material';
import Profile from '../Profile/Profile';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends React.ComponentProps<typeof MuiAppBar> {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpenSubmenu(null); // Fecha todos os submenus
    };

    const handleSubmenuClick = (item: string) => {
        // Atualiza o submenu aberto com base no item clicado
        setOpenSubmenu(openSubmenu === item ? null : item);
        if (!open) {
            setOpen(true);
        }
    };

    const handleNavigation = (route: string) => {
        try {
            navigate(route);
        } catch (error) {
            <Alert severity="error">Não foi possível realizar a navegação.</Alert>
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }), // Esconde o ícone quando o sidebar está aberto
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={Logo} alt="Logo" style={{
                        height: "40px",
                        marginRight: "10px",
                        cursor: "pointer" // Adiciona o cursor pointer
                    }} onClick={() => navigate('/TelaInicial')} />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Profile />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <React.Fragment key={item.text}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => {
                                        handleSubmenuClick(item.text);
                                        if (!item.subItems || item.subItems.length === 0) {
                                            handleNavigation(item.route);
                                        }
                                    }}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                        {/* {!open && item.subItems && <FiberManualRecordIcon sx={{ fontSize: 8, ml: 1 }} />} */}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                    {open ? (openSubmenu === item.text ? <ExpandMore /> : <ChevronLeftIcon />) : null}
                                </ListItemButton>
                            </ListItem>
                            {item.subItems && (
                                <Collapse in={openSubmenu === item.text} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subItems.map((subItem) => (
                                            <ListItemButton
                                                key={subItem.text}
                                                sx={{ pl: open ? 4 : 0 }}
                                                onClick={() => handleNavigation(subItem.route)}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {subItem.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={subItem.text} sx={{ opacity: open ? 1 : 0 }} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
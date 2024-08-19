import FactoryIcon from '@mui/icons-material/Factory';
import RecyclingIcon from '@mui/icons-material/Recycling';

export const menuItems = [
    {
        text: 'Manufatura',
        icon: <FactoryIcon />,
        route: '/',
        subItems: [
            {
                text: 'Scrap',
                icon: <RecyclingIcon />,
                route: '/Scrap',
            },
        ],
    },
];

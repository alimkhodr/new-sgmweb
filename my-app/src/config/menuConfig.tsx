import { Engineering, Security } from '@mui/icons-material';
import FactoryIcon from '@mui/icons-material/Factory';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

export const menuConfig = [
  {
    text: 'Manufatura',
    icon: <FactoryIcon />,
    route: '/',
    subItems: [
      {
        text: 'Scrap',
        icon: <RecyclingIcon />,
        route: '/Scrap',
        telaId: 101,
      },
      {
        text: 'Avaliação de Desempenho',
        icon: <ThumbsUpDownIcon />,
        route: '/AvaDesempenho',
        telaId: 1104,
      },
    ],
  },
  {
    text: 'Segurança',
    icon: <Security />,
    route: '/',
    subItems: [
      {
        text: 'Entrega de EPI',
        icon: <Engineering />,
        route: '/EntregaEPI',
        telaId: 250,
      },
    ],
  },
];

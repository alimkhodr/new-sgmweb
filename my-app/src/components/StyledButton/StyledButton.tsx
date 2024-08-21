import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import theme from '../../theme';

const StyledButton = styled(Button)(({ }) => ({
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    transition: "background-color 0.8s ease",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'none',
    },

}));

export default StyledButton;
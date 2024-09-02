import { Button, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

interface StyledButtonProps {
    loading?: boolean;
    loadingPosition?: 'start' | 'end'; // Aceitar loadingPosition
}

const StyledBtn = styled(Button)(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    transition: 'background-color 0.8s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'none',
    },
}));

const StyledButton = (props: StyledButtonProps & React.ComponentProps<typeof Button>) => {
    const { loading, loadingPosition, children, ...rest } = props;
    
    return (
        <StyledBtn
            {...rest}
            disabled={loading || rest.disabled}
        >
            {loading && loadingPosition === 'start' && (
                <Box display="flex" alignItems="center">
                    <CircularProgress size={24} />
                    <Box marginLeft={loading ? 1 : 0}>
                        {loading ? null : children}
                    </Box>
                </Box>
            )}
            {!loading && children}
            {loading && loadingPosition === 'end' && (
                <Box display="flex" alignItems="center">
                    {loading ? null : children}
                    <Box marginLeft={loading ? 1 : 0}>
                        <CircularProgress size={24} />
                    </Box>
                </Box>
            )}
        </StyledBtn>
    );
};

export default StyledButton;

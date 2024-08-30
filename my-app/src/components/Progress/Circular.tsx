import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import theme from '../../theme';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress sx={{color:theme.palette.secondary.main}}/>
    </Box>
  );
}
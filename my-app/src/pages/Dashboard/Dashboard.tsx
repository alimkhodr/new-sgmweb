import { CheckCircle, InsertInvitation } from '@mui/icons-material';
import { Button, Chip, FormControlLabel, Icon, IconButton, MenuItem, Paper, Switch, TextField, Typography } from '@mui/material';
import { Box, color, Grid, Stack, styled } from '@mui/system';
import { useState } from 'react';
import theme from '../../theme';
import Shortcuts from '../../components/Date/DateRanger';

const Dashboard = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const [selectedDate, setSelectedDate] = useState({ day: currentDay.toString(), month: (currentMonth + 1).toString(), year: currentYear.toString() });
    const [selectedDateRange, setSelectedDateRange] = useState<{ start: string, end: string }>();
    const [dateToDate, setDateToDate] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleDateRangeSelection = (startDate: string, endDate: string) => {
        setSelectedDateRange({ start: startDate, end: endDate });
        console.log('Intervalo selecionado:', startDate, 'a', endDate);
        setDateToDate(true);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.success.main,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        return {
            day: day,
            bgcolor: day === Number(selectedDate.day) && !dateToDate
                ? theme.palette.warning.main
                : (day <= currentDay ? theme.palette.success.main : theme.palette.grey[500])
        };
    });

    return (
        <Grid
            component="main"
            sx={{ margin: '85px 20px 20px 20px' }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={2}
        >
            <Box display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
            >
                <Typography variant="h3" fontWeight={'bold'} display={'flex'} alignItems={'center'}>
                    Dashboard
                </Typography>
                <Typography variant="h3" fontWeight={'bold'} display={'flex'} alignItems={'center'} margin={'0px 10px'} color={theme.palette.secondary.main}>
                    •
                </Typography>
                <Typography variant="h4" display={'flex'} alignItems={'center'}>
                    {dateToDate ? `${selectedDateRange?.start} - ${selectedDateRange?.end}` : `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`}
                </Typography>
            </Box>
            <Grid
                display={'flex'}
                flexDirection={'row'}
                alignItems={'flex-start'}
                gap={2}
                height="100%"
                width="100%"
            >
                <Grid
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    bgcolor={theme.palette.background.paper}
                    borderRadius={2}
                    border={'1px solid'}
                    borderColor={theme.palette.primary.light}
                    gap={0.4}
                    p={1}
                    height="100%"
                >
                    <IconButton
                        aria-label="date"
                        size="large"
                        onClick={() => setOpenModal(true)} // Abre o modal ao clicar no ícone
                    >
                        <InsertInvitation fontSize="small" />
                    </IconButton>
                    {days.map((day, index) => (
                        <Button
                            key={index}
                            size="small"
                            sx={{
                                minWidth: 0,
                                width: '100%',
                                bgcolor: day.bgcolor,
                                color: 'white',
                                padding: 0
                            }}
                            onClick={() => {
                                setSelectedDate({
                                    day: day.day.toString(),
                                    month: (currentMonth + 1).toString(),
                                    year: currentYear.toString(),
                                });
                                setDateToDate(false);
                            }}
                        >
                            {day.day}
                        </Button>
                    ))}
                </Grid>
                <Grid
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    gap={2}
                    height="100%"
                    width="100%"
                >
                    <Grid
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        bgcolor={theme.palette.background.paper}
                        borderRadius={2}
                        border={'1px solid'}
                        borderColor={theme.palette.primary.light}
                        justifyContent={'space-between'}
                        gap={2}
                        p={1}
                        width="100%"
                    >
                        <TextField
                            id="outlined-select-currency"
                            select label="Linha"
                            defaultValue="1"
                            fullWidth
                            size="small"
                            sx={{ maxWidth: 1000 }}
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                        </TextField>
                        <TextField
                            id="outlined-select-currency"
                            select label="Turno"
                            defaultValue="1"
                            fullWidth
                            size="small"
                            sx={{ maxWidth: 200 }}
                        >
                            <MenuItem value="1">1° Turno</MenuItem>
                            <MenuItem value="2">2° Turno</MenuItem>
                            <MenuItem value="3">3° Turno</MenuItem>
                        </TextField>
                        <FormControlLabel
                            value="auto"
                            control={<Switch color="success" />}
                            label="Automátioco"
                            labelPlacement="end"
                        />
                        <Box sx={{ flexGrow: 1, overflow: 'hidden', maxWidth: 180 }}>
                            <Item sx={{ p: 1 }}>
                                <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                    <CheckCircle />
                                    <Typography noWrap>PRODUZINDO</Typography>
                                </Stack>
                            </Item>
                        </Box>
                    </Grid>
                    <Grid
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        bgcolor={theme.palette.background.paper}
                        borderRadius={2}
                        border={'1px solid'}
                        borderColor={theme.palette.primary.light}
                        justifyContent={'space-between'}
                        gap={2}
                        p={1}
                        width="100%"
                        height="100%"
                    >
                    </Grid>
                </Grid>
            </Grid>

            {/* Shortcuts modal */}
            <Shortcuts
                onDateRangeSelected={handleDateRangeSelection}
                onCloseModal={() => setOpenModal(false)}
                open={openModal} // Controla a abertura do modal
            />
        </Grid>
    );
};

export default Dashboard;

import { InsertInvitation } from '@mui/icons-material';
import { Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Grid } from '@mui/system';
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
                overflow="auto"
            >
                <Grid
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    bgcolor={theme.palette.background.paper}
                    borderRadius={2}
                    border={'1px solid'}
                    borderColor={theme.palette.grey[400]}
                    gap={0.4}
                    p={1}
                    height="100%"
                    maxHeight="calc(100vh - 170px)"
                    overflow="auto"
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
                                color: theme.palette.primary.contrastText,
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
                    overflow="auto"
                >
                    <Grid
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        bgcolor={theme.palette.background.paper}
                        borderRadius={2}
                        border={'1px solid'}
                        borderColor={theme.palette.grey[400]}
                        gap={2}
                        p={1}
                        width="100%"
                        maxWidth={"calc(100vw - 160px)"}
                        overflow="auto"
                    >
                        <TextField
                            id="outlined-select-currency"
                            select label="Turno"
                            defaultValue="1"
                            fullWidth
                            size="small"
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
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                        </TextField>
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

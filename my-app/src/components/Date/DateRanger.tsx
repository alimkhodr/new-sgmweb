import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';

interface ShortcutsProps {
  onDateRangeSelected: (startDate: string, endDate: string) => void;
  onCloseModal: () => void;
  open: boolean;
}

const formatDate = (date: Dayjs | null) => {
  return date ? date.format('DD/MM/YYYY') : 'N/A';
};

export default function Shortcuts({ onDateRangeSelected, onCloseModal, open }: ShortcutsProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleAccept = () => {
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      onDateRangeSelected(formattedStartDate, formattedEndDate);
      onCloseModal(); // Fecha o modal ao aceitar
      setStartDate(null)
      setEndDate(null)
    }
  };

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 2,
    maxWidth: 400
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={styleModal}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <>
            <Box display="flex" justifyContent="space-between" alignItems={`center`} gap={2}>
              <DatePicker
                label="Início"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setEndDate(null);
                }}
                maxDate={dayjs()}
                sx={{ width: '100% ' }}
              />
              <Typography>-</Typography>
              <DatePicker
                label="Fim"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                maxDate={dayjs()}
                minDate={startDate || undefined}
                disabled={!startDate}
                sx={{ width: '100% ' }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Button onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button onClick={handleAccept} disabled={!startDate || !endDate}>
                Confirmar
              </Button>
            </Box>
          </>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
}

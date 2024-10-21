import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
// import { PickersShortcutsItem } from '@mui/x-date-pickers/PickersShortcuts';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { useEffect, useState } from 'react';

const formatDate = (date: Dayjs | null) => {
  return date ? date.format('DD/MM/YYYY') : 'N/A';
};

// const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
//   {
//     label: 'This Week',
//     getValue: () => {
//       const today = dayjs();
//       return [today.startOf('week'), today.endOf('week')];
//     },
//   },
//   {
//     label: 'Last Week',
//     getValue: () => {
//       const today = dayjs();
//       const prevWeek = today.subtract(7, 'day');
//       return [prevWeek.startOf('week'), prevWeek.endOf('week')];
//     },
//   },
//   {
//     label: 'Last 7 Days',
//     getValue: () => {
//       const today = dayjs();
//       return [today.subtract(7, 'day'), today];
//     },
//   },
//   {
//     label: 'Current Month',
//     getValue: () => {
//       const today = dayjs();
//       return [today.startOf('month'), today.endOf('month')];
//     },
//   },
//   {
//     label: 'Next Month',
//     getValue: () => {
//       const today = dayjs();
//       const startOfNextMonth = today.endOf('month').add(1, 'day');
//       return [startOfNextMonth, startOfNextMonth.endOf('month')];
//     },
//   },
//   { label: 'Reset', getValue: () => [null, null] },
// ];

interface ShortcutsProps {
  onDateRangeSelected: (startDate: string, endDate: string) => void;
  onCloseModal: () => void;
}

export default function BasicRangeShortcuts({ onDateRangeSelected, onCloseModal }: ShortcutsProps) {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const messageElements = document.querySelectorAll('div');
      messageElements.forEach((element) => {
        if (element.textContent === "MUI X Missing license key") {
          element.style.display = 'none';
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const handleDateRangeChange = (newValue: DateRange<Dayjs>) => {
    setValue(newValue);
  };

  const handleAccept = () => {
    if (value[0] && value[1]) {
      const formattedStartDate = formatDate(value[0]);
      const formattedEndDate = formatDate(value[1]);
      onDateRangeSelected(formattedStartDate, formattedEndDate);
    }
    onCloseModal(); // Fecha o modal ao aceitar
  };

  const handleCancel = () => {
    onCloseModal(); // Fecha o modal ao cancelar
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateRangePicker
      maxDate={dayjs()}
        value={value}
        onChange={handleDateRangeChange}
        onAccept={handleAccept}
        onClose={handleCancel} // Chama a função de fechar o modal
        slotProps={{
          // shortcuts: {
          //   items: shortcutsItems,
          // },
        }}
      />
    </LocalizationProvider>
  );
}

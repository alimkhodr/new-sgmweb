import React from 'react';
import { Snackbar, Alert } from "@mui/material";

interface AlertSnackbarProps {
    open: boolean;
    handleClose: () => void;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ open, handleClose, message, severity }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;

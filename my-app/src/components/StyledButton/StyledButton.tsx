import { styled } from "@mui/material";
import { ReactNode, MouseEventHandler } from "react";

interface StyledButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;  // Adiciona a prop disabled
}

const CustomButton = styled("button")(({ theme }) => ({
  border: "none",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "10px",
  padding: "10px 15px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  color: theme.palette.primary.contrastText,

  transition: "background-color 0.6s ease, transform 0.6s ease, border 0.6s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "scale(1.02)",
    border: "none",
  },
}));

const StyledButton: React.FC<StyledButtonProps> = ({ children, onClick }) => {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

export default StyledButton;

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Grid, styled, Typography } from "@mui/material";
import Logo from "../../../assets/images/logo/aptiv_logo_white.png"

const StyledFooter = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "20px 0",
  borderTop: `1px solid ${theme.palette.divider}`,
  width: "-webkit-fill-available",
  position: "relative",
  bottom: 0,
  height: "100%"
}));

const StyledHr = styled("hr")(({ theme }) => ({
  border: `none`,
  height: "1px",
  backgroundColor: theme.palette.primary.contrastText,
  margin: theme.spacing(2, 0),
}));

const IconLink = styled("a")(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.contrastText,
  borderRadius: "10px",
  padding: "5px",
  display: "flex",
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const Link = styled("a")(() => ({
  textDecoration: 'none',
  color: "#aeaeae",
  transition: 'textDecoration 0.5s',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Grid margin={"0 30px"}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "center", md: "left" }}>
            <img src={Logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "center", md: "right" }}>
            <Box display="flex" justifyContent="center"  textAlign="center" flexDirection={{ xs: "column", md: "row" }}>
              <Link href="#" sx={{ margin: "5px" }}>
                Primeiro Link
              </Link>
              <Link href="#" sx={{ margin: "5px" }}>
                Segundo Link
              </Link>
              <Link href="#" sx={{ margin: "5px" }}>
                Terceiro Link
              </Link>
              <Link href="#" sx={{ margin: "5px" }}>
                Quarto Link
              </Link>
            </Box>
          </Grid>
        </Grid>
        <StyledHr />
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6} display="flex" justifyContent={{ xs: "center", sm: "left" }}>
            <Typography variant="body2" color="primary.contrastText">
              © 2024 Aptiv. All rights reserved
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent={{ xs: "center", sm: "right" }}>
            <Box display="flex" justifyContent="center">
              <IconLink href="https://www.linkedin.com/in/alimohamedkhodr/" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon fontSize="small" />
              </IconLink>
              <IconLink href="https://wa.me/12988594305" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon fontSize="small" />
              </IconLink>
              <IconLink href="https://github.com/alimkhodr" target="_blank" rel="noopener noreferrer">
                <GitHubIcon fontSize="small" />
              </IconLink>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </StyledFooter>
  );
}

export default Footer;

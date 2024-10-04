import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { minWidth } from '@mui/system';

const steps = [
  {
    label: 'Saúde & Segurança',
    description: (
      <dl>
        <dt>1 - Operador não usa sistematicamente e adequadamente os equipamentos/Ferramentas e/ou não segue as regras - Não identifica os pilares de segurança em sua área de trabalho;</dt>
        <dt>4 - Operador usa sistematicamente e adequadamente os Equipamentos/Ferramentas de acordo com as regras - Identifica os pilares de segurança na sua área de trabalho;</dt>
      </dl>
    ),
  },
  {
    label: 'Absenteísmo/Pontualidade',
    description: (
      <dl>
        <dt>1 - Faltou sem avisar previamente, chegou atrasado mais de uma vez;</dt>
        <dt>4 - Nunca faltou ou chegou atrasado;</dt>
      </dl>
    ),
  },
];

const stepsAvaliador = [
  {
    label: '1 - Avaliação do Coordenador e/ou Líder',
    description: (
      <>
        <dl>
          <dt>1.1 - Considera que o funcionário tem habilidades suficientes para executar o trabalho?</dt>
        </dl>
        <Box width={"100%"} p={"0 100px"}>
          <TextField
            id="nome"
            label="Se NÃO, justifique"
            multiline
            maxRows={4}
            fullWidth
          />
        </Box>
      </>
    ),
  },
  {
    label: '1 - Avaliação do Coordenador e/ou Líder',
    description: (
      <>
        <dl>
          <dt>1.2 - Considera que o funcionário tem potencial para executar outras funções?</dt>
        </dl>
        <Box width={"100%"} p={"0 100px"}>
          <TextField
            id="nome"
            label="Se SIM, quais?"
            multiline
            maxRows={4}
            fullWidth
          />
        </Box>
      </>
    ),
  },
  {
    label: '1 - Avaliação do Coordenador e/ou Líder',
    description: (
      <>
              <dl>
          <dt>Caso o resultado seja Insatisfatório, é necessário criar um plano de ação.</dt>
        </dl>
        <Box width={"100%"} p={"0 100px"}>
          <TextField
            id="nome"
            label="Plano de Ação"
            multiline
            maxRows={4}
            fullWidth
          />
        </Box>
      </>
    ),
  },
];

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStepAvaliador, setActiveStepAvaliador] = React.useState(0);
  const [selectedValues, setSelectedValues] = React.useState(Array(steps.length).fill(''));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextAvaliador = () => {
    setActiveStepAvaliador((prevActiveStepAvaliador) => prevActiveStepAvaliador + 1);
  };

  const handleBackAvaliador = () => {
    setActiveStepAvaliador((prevActiveStepAvaliador) => prevActiveStepAvaliador - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...selectedValues];
    newValues[activeStep] = event.target.value;
    setSelectedValues(newValues);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            p: "30px 15px",
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{steps[activeStep].label}</Typography>
            <Typography variant="subtitle2">1 - Não Atende / 2 - Atende Parcialmente / 3 - Atende / 4 - Excede</Typography>
          </Box>
        </Paper>
        <Box sx={{ width: '100%', p: 2, textAlign: "justify", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {steps[activeStep].description}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedValues[activeStep]}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
        </Box>
        <MobileStepper
          variant="text"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            p: "30px 15px",
            bgcolor: 'background.default',
          }}
        >
          <Typography>{stepsAvaliador[activeStepAvaliador].label}</Typography>
        </Paper>
        <Box sx={{ width: '100%', p: 2, textAlign: "justify", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {stepsAvaliador[activeStepAvaliador].description}
        </Box>
        <MobileStepper
          variant="text"
          steps={stepsAvaliador.length}
          position="static"
          activeStep={activeStepAvaliador}
          nextButton={
            <Button
              size="small"
              onClick={handleNextAvaliador}
              disabled={activeStepAvaliador === stepsAvaliador.length - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBackAvaliador} disabled={activeStepAvaliador === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Box>
  );
}

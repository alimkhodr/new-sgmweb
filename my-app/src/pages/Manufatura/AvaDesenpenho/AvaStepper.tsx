import * as React from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useState } from 'react';


export default function TextMobileStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepAvaliador, setActiveStepAvaliador] = useState(0);
  const [selectedValues, setSelectedValues] = useState(Array(17).fill('')); //quantidade de perguntas
  const [resultado, setResultado] = useState<number>(0);

  const getResultadoLabel = (resultado: number): string => {
    if (resultado >= 95 && resultado <= 100) {
      return "Muito Bom";
    } else if (resultado >= 80) {
      return "Bom";
    } else if (resultado >= 75) {
      return "Satisfatório";
    } else {
      return "Insatisfatório";
    }
  };

  const steps = [
    {
      sigla: 'S',
      label: 'Saúde & Segurança',
      description: (
        <dl>
          <dt>1 - Operador não usa sistematicamente e adequadamente os equipamentos/Ferramentas e/ou não segue as regras - Não identifica os pilares de segurança em sua área de trabalho;</dt>
          <dt>4 - Operador usa sistematicamente e adequadamente os Equipamentos/Ferramentas de acordo com as regras - Identifica os pilares de segurança na sua área de trabalho;</dt>
        </dl>
      ),
    },
    {
      sigla: 'P',
      label: 'Absenteísmo/Pontualidade',
      description: (
        <dl>
          <dt>1 - Faltou sem avisar previamente, chegou atrasado mais de uma vez;</dt>
          <dt>4 - Nunca faltou ou chegou atrasado;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Q',
      label: 'Qualidade',
      description: (
        <dl>
          <dt>1 - O operador causou reclamação de clietne ou apresentou altos índices de inspeção final/FTQ - Não sabe o que fazer em caso de defeitos/problema no produto - Não sabe o significado de FTQ;</dt>
          <dt>4 - Operador não causou reclamação de cliente nem problemas na inspeção final & FTQ - Sabe o que fazer em caso de defeitos/problemas no produto - Sabe o significado/impacto de FTQ;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Q',
      label: 'Operador trabalha de acordo com os métodos, instruções de trabalho, requisitos dos clientes e ordens de produção',
      description: (
        <dl>
          <dt>1 - Operador não segue o método/instruções de trabalho/requisitos dos clientes e ordens de produção;</dt>
          <dt>4 - Segue-os totalmente;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Q',
      label: 'Respeito & Manuseio ao Material',
      description: (
        <dl>
          <dt>1 - Várias evidências de falta de respeito ao material, não sabe o que fazer se encontrar materiais não conforme;</dt>
          <dt>4 - Respeito ao material é evidente, nenhum material toca no chão, o material é organizado nas locações, sabe o que fazer em caso de não conformidade do material;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Q',
      label: 'Organização & Limpeza de Acordo com as Regras Determinadas',
      description: (
        <dl>
          <dt>1 - Estação de trabalho está suja e desorganizada;</dt>
          <dt>4 - Estação de trabalho totalmente limpa e organizada;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Q',
      label: 'Rastreabilidade (Operadores da Área de Eletrônica)',
      description: (
        <dl>
          <dt>1 - Não realiza a rastreabilidade;</dt>
          <dt>4 - Sempre realiza a rastreabilidade;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Q',
      label: 'Trabalho Padronizado (SOS/WAM)',
      description: (
        <dl>
          <dt>1 - Não segue a todo momento;</dt>
          <dt>4 - Segue a todo momento;</dt>
        </dl>
      ),
    },
    {
      sigla: 'V',
      label: 'Tempo de Setup/Abastecimento de Linha',
      description: (
        <dl>
          <dt>1 - Não organiza seu tempo/Não antecipa pedido de abastecimento em linha;</dt>
          <dt>4 - Sempre organiza seu tempo/Sempre antecipa pedido de abastecimento em linha;</dt>
        </dl>
      ),
    },
    {
      sigla: 'C',
      label: 'Produtividade',
      description: (
        <dl>
          <dt>1 - Operador não atinge as metas estabelecidas;</dt>
          <dt>4 - Sempre atinge;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Conhecimento',
      label: 'Conhecimento em Excelência - Definição de Visão, Estratégia, Valores e Política de Qualidade',
      description: (
        <dl>
          <dt>1 - Não conhece nenhum deles;</dt>
          <dt>4 - Conhece todos eles;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Comportamento',
      label: 'Relações Humanas',
      description: (
        <dl>
          <dt>1 - Não pratica trabalho em equipe, cria conflitos, é rude, não ajuda os colegas, tem dificuldade de relacionamento com o líder do time;</dt>
          <dt>4 - Trabalha bem em equipe, ajuda a resolver conflitos, ajuda os colegas, contribui para um bom ambiente de trabalho, tem bom relacionamento com o Líder do Time;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Comportamento',
      label: 'Comprometimento',
      description: (
        <dl>
          <dt>1 - Não é comprometido com as necessidades da Planta;</dt>
          <dt>4 - É extremamente comprometido, dedicado, sempre se voluntaria a ajudar, profundamente envolvido em atingir os targets;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Comportamento',
      label: 'Flexibilidade',
      description: (
        <dl>
          <dt>1 - Não aceita mudanças de turno ou trabalho para colaborar com as necessidades da planta;</dt>
          <dt>4 - É totalmente flexível quanto às mudanças de turno, trabalho, outras plantas;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Comportamento',
      label: 'Disciplina - Seguir as Políticas Aptiv',
      description: (
        <dl>
          <dt>1 - Não segue as políticas APTIV (Regras e procedimentos);</dt>
          <dt>4 - Segue totalmente as políticas APTIV (Regras e Procedimento) e encoraja os colegas do time a cumprirem também;</dt>
        </dl>
      ),
    },
    {
      sigla: 'Comportamento',
      label: 'Enterprise Operating System - EOS (Liderança)',
      description: (
        <dl>
          <dt>1 - Não conhece e não sabe acessar a plataforma de procedimentos da Aptiv;</dt>
          <dt>4 - Conhece e domina a plataforma de procedimentos da Aptiv;</dt>
        </dl>
      ),
    },
    {
      sigla: 'D.P.',
      label: 'Desenvolvimento Pessoal',
      description: (
        <>
          <dl>
            <dt>1 - Não procura desenvolver profissionalmente;</dt>
            <dt>4 - Está sempre à procura do crescimento profissional;</dt>
          </dl>
          <Box width={"100%"} >
            <TextField
              id="nome"
              label="Área de Atuação (Curso):"
              multiline
              maxRows={4}
              fullWidth
            />
          </Box>
        </>
      ),
    },
    {
      sigla: 'Resultado Final',
      description: (
        <>
          <Box width={"100%"} textAlign={"center"}>
            <Typography variant='h1' fontWeight={"bold"}>{resultado}%</Typography>
            <Typography variant='h6'>{getResultadoLabel(resultado)}</Typography>
          </Box>
        </>
      ),
    },
  ];

  const stepsAvaliador = [
    {
      label: '1 - Avaliação do Coordenador e/ou Líder',
      description: (
        <>
          <Typography>1.1 - Considera que o funcionário tem habilidades suficientes para executar o trabalho?</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="1" control={<Radio />} label="Sim" />
            <FormControlLabel value="2" control={<Radio />} label="Não" />
          </RadioGroup>
          <Box width={"100%"} >
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
          <Typography>1.2 - Considera que o funcionário tem potencial para executar outras funções?</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="1" control={<Radio />} label="Sim" />
            <FormControlLabel value="2" control={<Radio />} label="Não" />
          </RadioGroup>
          <Box width={"100%"} >
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
          <Box width={"100%"} >
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 16) {
      const hasValue6 = selectedValues[6] !== '';
      const hasValue16 = selectedValues[16] !== '';

      let qtdPerguntas;
      if (hasValue6 && hasValue16) {
        qtdPerguntas = 68;
      } else if (hasValue6 || hasValue16) {
        qtdPerguntas = 64;
      } else {
        qtdPerguntas = 60;
      }

      let resultado = 0;
      let resultado1 = 0;
      let resultado2 = 0;
      let resultado3 = 0;
      let resultado4 = 0;

      for (let i = 0; i < selectedValues.length; i++) {
        const valor = selectedValues[i];
        if (valor == 1) {
          resultado1 += 1;
        } else if (valor == 2) {
          resultado2 += 1;
        } else if (valor == 3) {
          resultado3 += 1;
        } else if (valor == 4) {
          resultado4 += 1;
        }
      }
      resultado = ((resultado1 * 1) + (resultado2 * 2) + (resultado3 * 3) + (resultado4 * 4))
      const percentual = (resultado / qtdPerguntas) * 100;
      const percentualArredondado = Math.round(percentual);
      setResultado(percentualArredondado)
    }
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
            p: "35px 10px",
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography p={2} bgcolor={"background.paper"} borderRadius={1} fontWeight={"bold"} mr={2}>{steps[activeStep].sigla}</Typography>
            <Box sx={{ display: activeStep === 17 ? 'none' : 'flex', flexDirection: "column" }} >
              <Typography fontWeight={"bold"}>{steps[activeStep].label}</Typography>
              <Typography variant="subtitle2" >1 - Não Atende / 2 - Atende Parcialmente / 3 - Atende / 4 - Excede</Typography>
            </Box>
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
            sx={{ display: activeStep === 17 ? 'none' : 'flex' }}
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
              disabled={activeStep === steps.length - 1 || (selectedValues[activeStep] === '' && activeStep !== 6 && activeStep !== 16)}
            >
              {(activeStep === 6 || 16) && selectedValues[activeStep] != '' || activeStep !== 6 && activeStep !== 16 ? "Próximo" : "Pular"}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Voltar
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
          <Typography fontWeight={"bold"}>{stepsAvaliador[activeStepAvaliador].label}</Typography>
        </Paper>
        <Box sx={{ width: '100%', p: 2, textAlign: "justify", display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "background.papper" }}>
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
            >
              Próximo
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBackAvaliador} disabled={activeStepAvaliador === 0}>
              <KeyboardArrowLeft />
              Voltar
            </Button>
          }
        />
      </Box>
    </Box>
  );
}

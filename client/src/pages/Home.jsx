import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Home.css";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Typography from "@mui/material/Typography";
import { Container } from "react-bootstrap";
//import BusinessIcon from "@mui/icons-material/Business";
//import routes from "../../helpers/routes";
//import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={7}>
            <Item>
              <Typography
                variant="h2"
                align="left"
                component="div"
                gutterBottom
              >
                BIENVENID@ A <span className="span2">UP</span>
                <span>WORKS</span>
              </Typography>

              <div className="p-size">
                <p>
                  Encuentra el lugar perfecto para trabajar, o consigue
                  proyectos para aumentar tu portafolio. Si eres una empresa
                  contrata gente para que te ayude.
                </p>
              </div>
              <br />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PersonOutlineIcon />}
                  href="/login"
                >
                  INICIAR SESION
                </Button>
                {/*
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<BusinessIcon />}
                  href="/acerca-de"
                >
                  INICIAR SESION COMO EMPRESA
                </Button>*/}

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<InfoIcon />}
                  href="/acerca-de"
                >
                  ACERCA DE NOSOTROS
                </Button>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={12} md={5}>
            <Item>
              <img src="/dist/assets/logoUpwork.png" alt="logo" />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
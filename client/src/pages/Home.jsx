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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Hover = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "justify",
  transition: '0.39s',
  '&:hover': {
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
  },
}));

export default function Home() {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }} style={{ paddingTop: '3rem' }}>
        <Grid container spacing={2}>
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
              <img src="/src/logoUpwork.png" alt="logoUp" />
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} style={{ paddingTop: '5rem' }}>
        <Container>
          <Typography variant="h3" align="center" component="div" gutterBottom>
            BENEFICIOS PARA TODOS
          </Typography>
        </Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Hover>
              <Card sx={{ maxWidth: 445 }}>
                <CardMedia
                  component="img"
                  image="https://images.pexels.com/photos/6945/sunset-summer-golden-hour-paul-filitchkin.jpg?cs=srgb&dl=pexels-snapwire-6945.jpg&fm=jpg"
                  alt="impulsate"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    IMPULSATE
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Si eres un <span>alumno/egresado</span> crece de manera personal en tus conocimientos y experiencia, impulsate a ti mismo hacer mejor.
                    <br></br>Si eres una <span>empresa</span> haz crecer tu negocio contratando personal que ayude a mejorar la productividad
                  </Typography>
                </CardContent>

              </Card>
            </Hover>
          </Grid>

          <Grid item xs={4}>
            <Hover>
              <Card sx={{ maxWidth: 445 }}>
                <CardMedia
                  component="img"
                  image="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?cs=srgb&dl=pexels-fauxels-3184292.jpg&fm=jpg"
                  alt="incrementa tus ingresos"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    UNETE
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </Hover>
          </Grid>
          <Grid item xs={4}>
            <Hover>
              <Card sx={{ maxWidth: 445 }}>
                <CardMedia
                  component="img"
                  image="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?cs=srgb&dl=pexels-pixabay-159866.jpg&fm=jpg"
                  alt="incrementa tus ingresos"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    APRENDIZAJE
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </Hover>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
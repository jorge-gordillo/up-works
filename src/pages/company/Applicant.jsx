import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Applicant.css";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import SendIcon from '@mui/icons-material/Send';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Box,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  TextField,
  Button,
  Stack
} from "@mui/material";

//url de api fake y rikolino
const CoUrl = "http://localhost:8000/";

//Alertas
const Alert = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1800,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 790,
  bgcolor: "#F5FFFB",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Applicant() {
  const [data, setData] = useState([]);
  const [modalEnviar, setModalEnviar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    name: "",
    email: "",
    description_e: "",
  })
  const handleChange = e => {
    const { name, value } = e.target;
    setConsolaSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  const peticionGet = async () => {
    await axios.get(CoUrl)
      .then(response => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.fire({
          icon: "error",
          title: "Ups.. Algo salio mal!",
        });
      });
  }
  const peticionPut = async () => {
    await axios.put(CoUrl + consolaSeleccionada.id, consolaSeleccionada)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(consola => {
          if (consolaSeleccionada.id === consola.id) {
            consola.name = consolaSeleccionada.name;
            consola.email = consolaSeleccionada.email;
            consola.description_e = consolaSeleccionada.description_e;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEnviar();
        Alert.fire({
          icon: "success",
          title: "Actualizacion Exitosa",
        });
      })
  }

  const peticionDelete = async () => {
    await axios.delete(CoUrl + consolaSeleccionada.id)
      .then(response => {
        setData(data.filter(consola => consola.id !== consolaSeleccionada.id));
        abrirCerrarModalEliminar();
        Alert.fire({
          icon: "success",
          title: "Eliminacion Exitosa",
        });
      })
  }

  const abrirCerrarModalEnviar = () => {
    setModalEnviar(!modalEnviar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    (caso === 'Responder') ? abrirCerrarModalEnviar() : abrirCerrarModalEliminar()
  }

  useEffect(async () => {
    await peticionGet();
  }, [])

  const bodyEnviar = (
    <>
      <Box xs={style}>
        <Dialog open={true} fullWidth>
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Responder {<QuestionAnswerIcon />}</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <TextField
                    id="outlined-basic"
                    name="name"
                    label="Nombre De Para Quien Va Dirigido *"
                    variant="outlined"
                    onChange={handleChange}
                    value={consolaSeleccionada && consolaSeleccionada.name}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <TextField
                    id="outlined-basic"
                    name="email"
                    label="Correo Electronico *"
                    variant="outlined"
                    onChange={handleChange}
                    value={consolaSeleccionada && consolaSeleccionada.email}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={11.25}>
                <FormControl fullWidth sx={{ m: 1, Width: 200 }}>
                  <TextField
                    id="outlined-multiline-static"
                    name="description_e"
                    label="Descripcion Del Email A Mandar"
                    onChange={handleChange}
                    value={consolaSeleccionada && consolaSeleccionada.description_e}
                    multiline
                    fullWidth
                    rows={6}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box>
              <Button color="primary" onClick={() => peticionPut()}>Enviar</Button>
              <Button onClick={() => abrirCerrarModalEnviar()}>Cancelar</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  )

  const bodyEliminar = (
    <Box sx={style}>
      <p>
        Estás seguro que deseas eliminar al alumno{" "}
        <span>{consolaSeleccionada && consolaSeleccionada.name_alumno} </span>?{" "}
      </p>
      <div align="right">
        <Stack spacing={2} direction="row">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => peticionDelete()}
          >
            Sí
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </Button>
        </Stack>
      </div>
    </Box>
  )
  return (
    <>
      <div class="Principal">

        {data.map((consola) => (
          <Card class="cardEmpleo" sx={{ maxWidth: 400, maxHeight: 500 }} key={consola.id}>
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                {consola.name_alumno}
              </Typography>
              <Chip
                icon={<RoomIcon />}
                label={consola.interview_date}
                component="a"
                href="#"
                variant="outlined"
                clickable
              />
              <Typography variant="body2" color="text.secondary">
                {consola.message}
              </Typography>
            </CardContent>
            <CardActions>
              <Box>
                <SendIcon onClick={() => seleccionarConsola(consola, 'Responder')} />
                &nbsp;&nbsp;&nbsp;
                <DeleteIcon onClick={() => seleccionarConsola(consola, 'Eliminar')} />
              </Box>
            </CardActions>
          </Card>
        ))}
        <Modal
          open={modalEnviar}
          onClose={abrirCerrarModalEnviar}>
          {bodyEnviar}
        </Modal>

        <Modal
          open={modalEliminar}
          onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
      </div>
    </>
  );
}

export default Applicant;

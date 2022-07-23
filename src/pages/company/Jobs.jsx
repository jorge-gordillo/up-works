import React, { useEffect, useState } from "react";
import "./Jobs.css";
import axios from "axios";
import {
  Box,
  FormControl,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container,
  Modal,
  InputLabel,
  Card,
  CardContent,
  Chip,
  MenuItem,
  CardActions,
  Stack,
  Select,
  InputAdornment,
  OutlinedInput,
  Avatar,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

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

export default function Jobs() {
  function getId() {
    return window.localStorage.getItem("id");
  }

  function getId_Company() {
    return parseInt(window.localStorage.getItem("id_company"));
  }
  function getPhoto() {
    return window.localStorage.getItem("photo");
  }

  const CoUrl = `http://127.0.0.1:8000/api/v1/companies/${getId()}/jobs/`;
  const CoUrlT = `http://127.0.0.1:8000/api/v1/jobs/`;

  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [jobSelec, setJobSelec] = useState({
    title: "",
    workplace: "",
    ubication: "",
    job_type: "",
    description: "",
    salary: "",
    status: "",
    id_company: getId_Company(),
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSelec((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(jobSelec);
  };
  
  const peticionGet = async () => {
    await axios
      .get(CoUrl)
      .then((response) => {
        response.data.data.forEach((element) => console.log(element));
        setData(response.data.data);
        localStorage.setItem("id_company", response.data.data[0].company.id);
        console.log("ID Company =" + response.data.data[0].company.id);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.fire({
          icon: "error",
          title: "Ups.. Algo salio mal!",
        });
      });
  };

  const peticionPost = async () => {
    await axios
      .post(CoUrlT, jobSelec)
      .then((response) => {
        console.log("Pedro mira:", jobSelec);
        getId_Company();
        setData(data.concat(jobSelec));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionPut = async () => {
    console.log(CoUrlT + jobSelec.id +"/", jobSelec);
    await axios.put(CoUrlT + jobSelec.company.id +"/", jobSelec).then((response) => {
      var dataNueva = data;
      dataNueva.map((job) => {
        if (jobSelec.id === job.id) {
          job.title = jobSelec.title;
          job.workplace = jobSelec.workplace;
          job.ubication = jobSelec.ubication;
          job.job_type = jobSelec.job_type;
          job.description = jobSelec.description;
          job.salary = jobSelec.salary;
          job.status = jobSelec.status;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
      Alert.fire({
        icon: "success",
        title: "Actualizacion Exitosa",
      });
    });
  };


  const peticionDelete = async () => {
    await axios.delete(CoUrlT + jobSelec.id +"/"  ).then((response) => {
      setData(data.filter((job) => job.id !== jobSelec.id));
      abrirCerrarModalEliminar();
      Alert.fire({
        icon: "success",
        title: "Eliminacion Exitosa",
      });
    });
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarJob = (job, caso) => {
    setJobSelec(job);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(async () => {
    await peticionGet();
  }, []);

  const bodyInsertar = (
    <>
      <Box xs={style}>
        <Dialog open={true} fullWidth>
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Nuevo Empleo {<WorkIcon />}</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <TextField
                    required
                    id="outlined-basic"
                    name="title"
                    label="Nombre Del Trabajo"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-multiple-name-label">
                    Lugar De Trabajo *
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="workplace"
                    onChange={handleChange}
                    autoWidth
                    label="Lugar de trabajo *"
                  >
                    <MenuItem value="">
                      <em>Elegir</em>
                    </MenuItem>
                    <MenuItem value="remoto">Remoto</MenuItem>
                    <MenuItem value="presencial">Presencial</MenuItem>
                    <MenuItem value="hibrido">Hibrido</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <TextField
                    required
                    id="outlined-basic"
                    name="ubication"
                    label="Ubicacion"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-multiple-name-label">
                    Tipo De Trabajo *
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="job_type"
                    onChange={handleChange}
                    autoWidth
                    label="Tipo De Trabajo *"
                  >
                    <MenuItem value="">
                      <em>Elegir</em>
                    </MenuItem>
                    <MenuItem value="tiempo completo">Tiempo completo</MenuItem>
                    <MenuItem value="medio tiempo">Medio tiempo</MenuItem>
                    <MenuItem value="indeterminado">Iderterminado</MenuItem>
                    <MenuItem value="temporal">Temporal</MenuItem>
                    <MenuItem value="voluntariado">Voluntariado</MenuItem>
                    <MenuItem value="prácticas">Prácticas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Salario
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="outlined-adornment-amount"
                    name="salary"
                    label="Salario"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={11.25}>
                <FormControl fullWidth sx={{ m: 1, Width: 200 }}>
                  <TextField
                    required
                    id="outlined-multiline-static"
                    name="description"
                    onChange={handleChange}
                    label="Descripcion Del Trabajo"
                    multiline
                    fullWidth
                    rows={6}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-multiple-name-label">
                    Estado *
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="status"
                    onChange={handleChange}
                    autoWidth
                    label="Lugar de trabajo *"
                  >
                    <MenuItem value="">
                      <em>Elegir</em>
                    </MenuItem>
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button color="primary" onClick={() => peticionPost()}>
                Crear
              </Button>
              <Button onClick={() => abrirCerrarModalInsertar()}>
                Cancelar
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );

  const bodyEditar = (
    <>
      <Box xs={style}>
        <Dialog open={true} fullWidth>
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Empleo {<EditIcon />}</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <TextField
                    required
                    id="outlined-basic"
                    name="title"
                    label="Nombre Del Trabajo "
                    variant="outlined"
                    onChange={handleChange}
                    value={jobSelec && jobSelec.title}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-multiple-name-label">
                    Lugar De Trabajo *
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="workplace"
                    onChange={handleChange}
                    autoWidth
                    label="Lugar de trabajo *"
                    value={jobSelec && jobSelec.workplace}
                  >
                    <MenuItem value="">
                      <em>Elegir</em>
                    </MenuItem>
                    <MenuItem value="remoto">Remoto</MenuItem>
                    <MenuItem value="presencial">Presencial</MenuItem>
                    <MenuItem value="hibrido">Hibrido</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <TextField
                    required
                    id="outlined-basic"
                    name="ubication"
                    label="Ubicacion *"
                    variant="outlined"
                    value={jobSelec && jobSelec.ubication}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-multiple-name-label">
                    Tipo De Trabajo *
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="job_type"
                    onChange={handleChange}
                    autoWidth
                    label="Tipo De Trabajo *"
                    value={jobSelec && jobSelec.job_type}
                  >
                    <MenuItem value="">
                      <em>Elegir</em>
                    </MenuItem>
                    <MenuItem value="tiempo completo">Tiempo completo</MenuItem>
                    <MenuItem value="medio tiempo">Medio tiempo</MenuItem>
                    <MenuItem value="indeterminado">Iderterminado</MenuItem>
                    <MenuItem value="temporal">Temporal</MenuItem>
                    <MenuItem value="voluntariado">Voluntariado</MenuItem>
                    <MenuItem value="prácticas">Prácticas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Salario
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="outlined-adornment-amount"
                    name="salary"
                    label="Salario"
                    value={jobSelec && jobSelec.salary}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={11.25}>
                <FormControl fullWidth sx={{ m: 1, Width: 200 }}>
                  <TextField
                    required
                    id="outlined-multiline-static"
                    name="description"
                    label="Descripcion Del Trabajo"
                    onChange={handleChange}
                    value={jobSelec && jobSelec.description}
                    multiline
                    fullWidth
                    rows={6}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel id="demo-multiple-name-label">
                    Estado *
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="status"
                    onChange={handleChange}
                    autoWidth
                    value={jobSelec && jobSelec.status}
                    label="Lugar de trabajo *"
                  >
                    <MenuItem value="">
                      <em>Elegir</em>
                    </MenuItem>
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box>
              <Button color="primary" onClick={() => peticionPut()}>
                Editar
              </Button>
              <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );

  const bodyEliminar = (
    <Box sx={style}>
      <p>
        Estás seguro que deseas eliminar el trabajo{" "}
        <span>{jobSelec && jobSelec.title} </span>?{" "}
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
  );

  return (
    <>
      <div class="Boton">
        <Button
          variant="contained"
          onClick={() => abrirCerrarModalInsertar()}
          startIcon={<AddIcon />}
        >
          Nuevo Empleo
        </Button>
      </div>
      <div class="Principal">
        <Container maxWidth="auto">
          {data.map((job) => (
            <Card
              class="cardEmpleoJ"
              sx={{ maxWidth: 400, maxHeight: 500 }}
              key={job.id}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Avatar
                          alt="Remy Sharp"
                          src= {`http://127.0.0.1:8000${getPhoto()}/`}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Typography gutterBottom variant="h5">
                          {job.title}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                          Lugar de trabajo: {job.workplace}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                          Tipo de trabajo: {job.job_type}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                          Salario: ${job.salary}
                        </Typography>
                        </Grid>
                      <Grid item>
                        <Chip
                          icon={<RoomIcon />}
                          label={job.ubication}
                          component="a"
                          href="#"
                          variant="outlined"
                          clickable
                        />
                        <Typography variant="body2" color="text.primary">
                          {job.description}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        Estado: {job.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Box>
                  <EditIcon onClick={() => seleccionarJob(job, "Editar")} />
                  &nbsp;&nbsp;&nbsp;
                  <DeleteIcon onClick={() => seleccionarJob(job, "Eliminar")} />
                </Box>
              </CardActions>
            </Card>
          ))}
        </Container>

        <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
      </div>
    </>
  );
}

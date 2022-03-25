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
  InputAdornment,
  Button,
  Container,
  Modal,
  Card,
  CardContent,
  Chip,
  CardActions,
  Stack
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

//url de api fake y rikolino
const CoUrl = "http://localhost:3001/companies/";

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

function Jobs() {
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    title: "",
    ubication: "",
    salary: "",
    type: "",
    description: "",
    status: ""
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(CoUrl)
    .then(response=>{
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

  const peticionPost=async()=>{
    await axios.post(CoUrl, consolaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
    Alert.fire({
      icon: "success",
      title: "Registro Exitoso",
    });
  }

  const peticionPut=async()=>{
    await axios.put(CoUrl+consolaSeleccionada.id, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.id===consola.id){
          consola.title=consolaSeleccionada.title;
          consola.ubication=consolaSeleccionada.ubication;
          consola.salary=consolaSeleccionada.salary;
          consola.type=consolaSeleccionada.type;
          consola.description=consolaSeleccionada.description;
          consola.status=consolaSeleccionada.status;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
      Alert.fire({
        icon: "success",
        title: "Actualizacion Exitosa",
      });
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(CoUrl+consolaSeleccionada.id)
    .then(response=>{
      setData(data.filter(consola=>consola.id!==consolaSeleccionada.id));
      abrirCerrarModalEliminar();
      Alert.fire({
        icon: "success",
        title: "Eliminacion Exitosa",
      });
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
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
                  id="outlined-basic"
                  name="title"
                  label="Nombre Del Trabajo *"
                  variant="outlined"
                  onChange={handleChange} />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <TextField
                  id="outlined-basic"
                  name="ubication"
                  label="Ubicacion *"
                  variant="outlined"
                  onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <TextField
                  id="outlined-basic"
                  name="salary"
                  label="Salario *"
                  variant="outlined"
                  onChange={handleChange} />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <TextField
                  id="outlined-basic"
                  name="tyoe"
                  label="Tipo De Trabajo *"
                  variant="outlined"
                  onChange={handleChange} />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <TextField
                  id="outlined-basic"
                  name="status"
                  label="Estatus *"
                  variant="outlined"
                  onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid item xs={11.25}>
              <FormControl fullWidth sx={{ m: 1, Width: 200 }}>
                <TextField
                  id="outlined-multiline-static"
                  name="description"
                  onChange={handleChange} 
                  label="Descripcion Del Trabajo"
                  multiline
                  fullWidth
                  rows={6} />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box>
          <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
      </>
    
  )

  const bodyEditar=(
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
              id="outlined-basic"
              name="title"
              label="Nombre Del Trabajo *"
              variant="outlined"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.title}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <TextField
              id="outlined-basic"
              name="ubication"
              label="Ubicacion *"
              variant="outlined"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.ubication}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <TextField
              id="outlined-basic"
              name="salary"
              label="Salario *"
              variant="outlined"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.salary}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <TextField
              id="outlined-basic"
              name="type"
              label="Type *"
              variant="outlined"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.type}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <TextField
              id="outlined-basic"
              name="status"
              label="Estatus *"
              variant="outlined"
              onChange={handleChange}
              value={consolaSeleccionada && consolaSeleccionada.status}
            />
          </FormControl>
        </Grid>
        <Grid item xs={11.25}>
          <FormControl fullWidth sx={{ m: 1, Width: 200 }}>
            <TextField
              id="outlined-multiline-static"
              name="description"
              label="Descripcion Del Trabajo"
              onChange={handleChange} 
              value={consolaSeleccionada && consolaSeleccionada.description}
              multiline
              fullWidth
              rows={6}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box>
      <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </Box>
    </DialogContent>
  </Dialog>
</Box>
   </>
  )

  const bodyEliminar=(
    <Box sx={style}>
    <p>
      Estás seguro que deseas eliminar el trabajo{" "}
      <span>{consolaSeleccionada && consolaSeleccionada.title} </span>?{" "}
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
    <div class="Boton">
        <Button variant="contained"  onClick={()=>abrirCerrarModalInsertar()} startIcon={<AddIcon />}>
          Nuevo Empleo
        </Button>
      </div>
      <div class="Principal">
        <Container maxWidth="auto">
            {data.map((consola) => (
            <Card class="cardEmpleo" sx={{ maxWidth: 400, maxHeight: 500 }} key={consola.id}>
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  {consola.title}
                </Typography>
                <Chip
                  icon={<RoomIcon />}
                  label={consola.ubication}
                  component="a"
                  href="#"
                  variant="outlined"
                  clickable
                />
                <Typography variant="body2" color="text.secondary">
                  {consola.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Box>
                <EditIcon onClick={()=>seleccionarConsola(consola, 'Editar')}/>
               &nbsp;&nbsp;&nbsp;
               <DeleteIcon   onClick={()=>seleccionarConsola(consola, 'Eliminar')}/>
                </Box>
              </CardActions>
            </Card>
          ))}

        </Container>
      
   
   <Modal
   open={modalInsertar}
   onClose={abrirCerrarModalInsertar}>
      {bodyInsertar}
   </Modal>

   <Modal
   open={modalEditar}
   onClose={abrirCerrarModalEditar}>
      {bodyEditar}
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

export default Jobs;


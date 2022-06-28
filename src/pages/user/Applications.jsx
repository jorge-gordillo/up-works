import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Applications.css";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Box,
  Modal,
  Button,
  Stack
} from "@mui/material";

//url de api fake y rikolino
const CoUrl = "http://localhost:3001/applications";

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


function Applications() {
   const [data, setData] = useState([]);
  const [modalEliminar, setModalEliminar] = useState(false);
  
   const [consolaSeleccionada, setConsolaSeleccionada] = useState({
      title_p: "",
      ubication_p: "",
      description_p: "",
    })

  
 
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
  
 
   const bodyEliminar = (
     <Box sx={style}>
       <p>
         Estás seguro que deseas eliminar la postulacion a{" "}
         <span>{consolaSeleccionada && consolaSeleccionada.title_p} </span>?{" "}
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
                 {consola.title_p}
               </Typography>
               <Chip
                 icon={<RoomIcon />}
                 label={consola.ubication_p}
                 component="a"
                 href="#"
                 variant="outlined"
                 clickable
               />
               <Typography variant="body2" color="text.secondary">
                 {consola.description_p}
               </Typography>
             </CardContent>
             <CardActions>
               <Box>
                 <DeleteIcon onClick={() => seleccionarConsola(consola, 'Eliminar')} />
               </Box>
             </CardActions>
           </Card>
         ))}
 
         <Modal
           open={modalEliminar}
           onClose={abrirCerrarModalEliminar}>
           {bodyEliminar}
         </Modal>
       </div>
     </>
   );
 }
export default Applications
